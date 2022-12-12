from datetime import datetime
from rest_framework.permissions import AllowAny
import rest_framework
from dateutil.relativedelta import relativedelta
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.generics import ListAPIView
from rest_framework import viewsets as drf_viewsets, generics
from rest_framework import mixins as drf_mixins
from rest_framework import pagination as drf_pagination
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import UserProfile
from classes.models import Event
from . import  permissions
from subscriptions.serlializers import UserSubscriptionCreateSerializer, UserSubscriptionViewSerializer, \
    UserPaymentsViewSerializer, SubscriptionPlansViewSerializer, UserSubscriptionEditSerializer
from accounts.serializers import RestrictedUserSerializer
import django
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription, UserPayments, SubcriptionPlan
from .permissions import IsOwnerOrAdmin


class SubscriptionsAPIViewSet(
    drf_viewsets.GenericViewSet,
    drf_mixins.DestroyModelMixin,  # for deleting
    drf_mixins.CreateModelMixin,  # for model creation
    drf_mixins.RetrieveModelMixin,  # for model retrieval (view)
    drf_mixins.UpdateModelMixin,  # for model update (update)
):
    lookup_field = "username"  # the field to use to look up the user (in this case, the username)
    lookup_url_kwarg = "username"  # the url parameter to use to look up the user (in this case, the username)
    authentication_classes = [
        rest_framework.authentication.SessionAuthentication,
        rest_framework.authentication.TokenAuthentication,
    ]

    queryset = UserSubscription.objects.all()  # the queryset to use to look up the user

    # we override this method to use different serializers for different actions
    def get_serializer_class(self):
        # use the CreateSerializer for the create action
        print(self.action)
        if self.action == "create":
            return UserSubscriptionCreateSerializer
        if self.action in ["retrieve", "destroy"]:
            if "username" in self.request.parser_context["kwargs"] and \
                    self.request.user.username == self.request.parser_context["kwargs"]["username"]:
                return UserSubscriptionViewSerializer
        if self.action == "update":
            return UserSubscriptionEditSerializer
        return RestrictedUserSerializer
    # we override this function to use different permissions for different actions
    def get_permissions(self):
        if self.action in ["list", "retrieve", "update", "destroy"]:
            permission_list = [permissions.IsOwnerOrAdmin, rest_framework.permissions.IsAuthenticated]
        else:
            permission_list = [rest_framework.permissions.IsAuthenticated]
        return [permission() for permission in permission_list]

    def destroy(self, request, *args, **kwargs):
        print("destroy reached")
        user = UserProfile.objects.get(username=self.request.user.username)
        subscription = UserSubscription.objects.get(user=user)
        date = subscription.next_pay
        if date is None:
            pass
        print("ok")
        events = Event.objects.filter(day__gte=date)
        for event in events:
            event.students.remove(user)
        subscription.delete()
        return Response({"message": "Deleted"})



class PaymentsListView(ListAPIView):
    serializer_class = UserPaymentsViewSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    model = UserPayments

    def get_queryset(self):
        username = self.kwargs['username']
        queryset = self.model.objects.all().filter(username=username)
        return queryset

    def get_permissions(self):
        #Instantiates and returns the list of permissions that this view requires.

        #if self.action in ["destroy"]:
        #list, retrieve, update, destroy0
        permission_list = [permissions.IsOwnerOrAdmin, rest_framework.permissions.IsAuthenticated]
        return [permission() for permission in permission_list]

class SubscriptionPlansListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SubscriptionPlansViewSerializer
    model = SubcriptionPlan
    queryset = model.objects.all()
