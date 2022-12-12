from datetime import datetime

from django.forms import model_to_dict
from django.shortcuts import render
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
import rest_framework
from rest_framework import viewsets as drf_viewsets, response, decorators, status, authtoken
from rest_framework import mixins as drf_mixins
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken import models
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework import serializers, permissions
import django
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserProfile
from accounts.serializers import SignupSerializer, UserSerializer, RestrictedUserSerializer, EnrolSerializer
from classes.models import Class, Event
from classes.serializers import ClassSerializer
from subscriptions.models import UserSubscription, UserPayments

class IsSelfOrAdmin(BasePermission):
    """
    Allow access to admin users or the user themselves.
    """

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        elif request.user and obj == request.user:
            return True
        return False


class AccountsAPIViewSet(
    drf_viewsets.GenericViewSet,
    drf_mixins.CreateModelMixin,  # for model creation (signup)
    drf_mixins.RetrieveModelMixin,  # for model retrieval (profile)
    drf_mixins.UpdateModelMixin,  # for model update (profile update)
):
    # the docstring is used to generate the documentation for the API
    """
    API for user information management and retrieval

    * **Login** [ [login](/api/accounts/login/) | `POST` ]: obtain a valid authentication token by sending valid credentials
    * **Logout** [ [logout](/api/accounts/logout/) | `POST`]: invalidate currently owned authentication token
    * **Retrieve User** [ `<username>` | `GET`, `PUT` ]: obtain user information (by looking up username) or update user information
    """

    lookup_field = "username"  # the field to use to look up the user (in this case, the username)
    lookup_url_kwarg = "username"  # the url parameter to use to look up the user (in this case, the username)
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]  # the authentication classes to use for this viewset

    queryset = get_user_model().objects.all()  # the queryset to use to look up the user

    # the following function is used to get the serializer class to use for the view
    # we override it to use different serializers for different rest_framework.decorators.actions
    def get_serializer_class(self):
        if self.action == "create":  # if the action is create (signup)
            return SignupSerializer
        if self.action in ["retrieve", "update"]:
            if "username" in self.request.parser_context["kwargs"] and\
                    self.request.user.username == self.request.parser_context["kwargs"]["username"]:
                print(self.request.user)
                # if the user is staff or the user is looking up their own profile
                # they should be able to see and edit everything
                return UserSerializer
            else:
                # otherwise, they should only be able to see and edit their own profile
                print("restricted")
                return RestrictedUserSerializer
        elif self.action == "login":
            print(self.request)
            return AuthTokenSerializer
        elif self.action == "logout":
            # we don't need a serializer for the logout action
            # (we just need to invalidate the token, and send a success response)
            # so it suffices to return a dummy serializer (base django rest framework serializer)
            return rest_framework.serializers.Serializer
        return UserSerializer

    # we override this function to use different permissions for different actions
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create", "login"]:
            # if the action is create (signup) or login (obtain token) then we don't need any permissions
            permission_list = [AllowAny]
        elif self.action in ["update", "partial_update"]:  # if the action is update/partial_update (profile update)
            permission_list = [IsAuthenticated]
        elif self.action in ["retrieve", "logout"]:
            permission_list = [IsAuthenticated]
        else:
            permission_list = [AllowAny]
        return [permission() for permission in permission_list]

    @decorators.action(methods=["POST"], detail=False)
    def login(self, request, format=None):
        """
        Obtain an authentication token by providing valid credentials.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = rest_framework.authtoken.models.Token.objects.get_or_create(user=user)
        return rest_framework.response.Response({"token": token.key})

    @decorators.action(methods=["POST"], detail=False)
    def logout(self, request, format=None):
        """
        Invalidate the currently owned authentication token.

        **Permissions** :

        * _Authentication_ is required
        """
        django.shortcuts.get_object_or_404(models.Token, user=request.user).delete()
        return response.Response(status=status.HTTP_202_ACCEPTED)


class AccountsScheduleView(APIView):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = UserProfile.objects.get(username=kwargs['username'])
        print(user)
        events = Event.objects.filter(students__in=[user], cancel=False)
        lst = []
        for event in events:
            if event.day > datetime.now().date() or \
                    (event.day == datetime.now().date() and event.start_time > datetime.now().time()):
                dictionary = model_to_dict(event)
                students = dictionary['students']
                newlst = []
                for student in students:
                    newlst.append(student.username)
                dictionary['students'] = newlst
                lst.append(dictionary)
        sorted_list = sorted(lst,
                             key=lambda elem: (datetime.strptime(str(elem['day']), '%Y-%m-%d'), elem['start_time']))
        return Response(sorted_list)


class AccountsHistoryPageView(ListAPIView):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]
    permission_classes = (IsAuthenticated,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        username = self.kwargs['username']
        user = UserProfile.objects.get(username=username)
        queryset = self.model.objects.filter(day__lt=datetime.now().date(), students__in=[user])
        return queryset.order_by("day", "start_time")


class AccountsSchedulePageView(ListAPIView):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]
    permission_classes = (IsAuthenticated,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        username = self.kwargs['username']
        user = UserProfile.objects.get(username=username)
        queryset = self.model.objects.filter(day__gte=datetime.now().date(), students__in=[user])
        return queryset.order_by("day", "start_time")


class AccountsHistoryView(APIView):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = UserProfile.objects.get(username=kwargs['username'])
        print(user)
        events = Event.objects.filter(students__in=[user], cancel=False)
        lst = []
        for event in events:
            if event.day < datetime.now().date() or \
                    (event.day == datetime.now().date() and event.start_time < datetime.now().time()):
                dictionary = model_to_dict(event)
                students = dictionary['students']
                newlst = []
                for student in students:
                    newlst.append(student.username)
                dictionary['students'] = newlst
                lst.append(dictionary)
        sorted_list = sorted(lst,
                             key=lambda elem: (datetime.strptime(str(elem['day']), '%Y-%m-%d'), elem['start_time']))
        return Response(sorted_list)




class AccountsClassEnrolView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        serializer = EnrolSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if "username" in self.request.parser_context["kwargs"] and \
                self.request.user.username == self.request.parser_context["kwargs"]["username"]:
            user = self.request.user
            subscription = UserSubscription.objects.filter(user=user)
            bill = UserPayments.objects.filter(user=user, next_pay__gte=datetime.today())
            print(subscription)
            print(bill)
            if len(subscription) == 0 and len(bill) == 0:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            class_id = serializer.validated_data["class_id"]
            if "instance_id" in serializer.validated_data.keys():
                instance_id = serializer.validated_data["instance_id"]
                print(instance_id)
                event = Event.objects.get(id=instance_id)
                if event.students.count() < Class.objects.get(id=class_id).capacity and \
                        (event.day > datetime.today().date() or
                         (event.day == datetime.today().date() and event.start_time > datetime.now().time())):
                    event.students.add(self.request.user)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                events = Event.objects.filter(classes_id=class_id)
                for event in events:
                    if event.students.count() < Class.objects.get(id=class_id).capacity and \
                            (event.day > datetime.today().date() or
                             (event.day == datetime.today().date() and event.start_time > datetime.now().time())):
                        event.students.add(self.request.user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class AccountsClassDropView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        serializer = EnrolSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if "username" in self.request.parser_context["kwargs"] and \
                self.request.user.username == self.request.parser_context["kwargs"]["username"]:
            class_id = serializer.validated_data["class_id"]
            if "instance_id" in serializer.validated_data.keys():
                instance_id = serializer.validated_data["instance_id"]
                event = Event.objects.get(id=instance_id)
                if (event.day > datetime.today().date() or
                        (event.day == datetime.today().date() and event.start_time > datetime.now().time())):
                    event.students.remove(self.request.user)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                events = Event.objects.filter(classes_id=class_id)
                for event in events:
                    if (event.day > datetime.today().date() or
                            (event.day == datetime.today().date() and event.start_time > datetime.now().time())):
                        event.students.remove(self.request.user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
