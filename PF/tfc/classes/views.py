import json
from datetime import datetime

from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
from rest_framework import filters
from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from classes.models import Class, Event
from classes.serializers import ClassSerializer
from studios.models import Studio


class ClassDetailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        cla = get_object_or_404(Class, id=kwargs['class_id'])
        events = Event.objects.filter(classes=Class.objects.get(id=cla.id), cancel=False)
        lst = []
        for event in events:
            dictionary = model_to_dict(event)
            students = dictionary['students']
            newlst = []
            for student in students:
                newlst.append(student.username)
            dictionary['students'] = newlst
            lst.append(dictionary)
        return Response({
            'id': cla.id,
            'name': cla.name,
            'description': cla.description,
            'coach': cla.coach,
            'capacity': cla.capacity,
            'start_date': cla.start_date,
            'end_date': cla.end_date,
            'start_time': cla.start_time,
            'end_time': cla.end_time,
            'schedule': lst
        })


class ClassNameSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        queryset = self.model.objects.filter(classes__studio=studio, classes__name=self.kwargs['class_name'])
        return queryset


class ClassCoachSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        queryset = self.model.objects.filter(classes__studio=studio, classes__coach=self.kwargs['coach_name'])
        return queryset


class ClassDateStartView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        start_year = self.kwargs['year']
        start_month = self.kwargs['month']
        start_day = self.kwargs['day']
        start_date_string = f"{start_year}-{start_month}-{start_day}"
        start_date = datetime.strptime(start_date_string, '%Y-%m-%d')
        queryset = self.model.objects.filter(classes__studio=studio, day__gte=start_date)
        return queryset.order_by("day")


class ClassDateEndView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        end_year = self.kwargs['year']
        end_month = self.kwargs['month']
        end_day = self.kwargs['day']
        end_date_string = f"{end_year}-{end_month}-{end_day}"
        end_date = datetime.strptime(end_date_string, '%Y-%m-%d')
        queryset = self.model.objects.filter(classes__studio=studio, day__lte=end_date)
        return queryset.order_by("day")


class ClassDateRangeView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        start_year = self.kwargs['year']
        start_month = self.kwargs['month']
        start_day = self.kwargs['day']
        start_date_string = f"{start_year}-{start_month}-{start_day}"
        start_date = datetime.strptime(start_date_string, '%Y-%m-%d')
        end_year = self.kwargs['year2']
        end_month = self.kwargs['month2']
        end_day = self.kwargs['day2']
        end_date_string = f"{end_year}-{end_month}-{end_day}"
        end_date = datetime.strptime(end_date_string, '%Y-%m-%d')
        queryset = self.model.objects.filter(classes__studio=studio, day__gte=start_date, day__lte=end_date)
        return queryset.order_by("day")


class ClassTimeRangeView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ClassSerializer
    model = Event

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        print(studio)
        start_hour = self.kwargs['hour']
        start_min = self.kwargs['min']
        start_sec = self.kwargs['sec']
        start_time_string = f"{start_hour}-{start_min}-{start_sec}"
        start_time = datetime.strptime(start_time_string, '%H-%M-%S').time()
        print(start_time)
        end_hour = self.kwargs['hour2']
        end_min = self.kwargs['min2']
        end_sec = self.kwargs['sec2']
        end_time_string = f"{end_hour}-{end_min}-{end_sec}"
        end_time = datetime.strptime(end_time_string, '%H-%M-%S').time()
        print(end_time)
        queryset = self.model.objects.filter(classes__studio=studio, start_time__gte=start_time, end_time__lte=end_time)
        print(queryset)
        return queryset.order_by("day")