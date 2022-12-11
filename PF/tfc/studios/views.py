import json
from datetime import datetime
from math import radians, sin, cos, degrees, acos

from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework import filters
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from studios.models import Studio
from studios.serializers import GeoLocationSerializer
from classes.models import Class, Event


def calc_dist(lat_a, long_a, lat_b, long_b):
    lat_a = radians(lat_a)
    lat_b = radians(lat_b)
    long_diff = radians(long_a - long_b)
    distance = (sin(lat_a) * sin(lat_b) +
                cos(lat_a) * cos(lat_b) * cos(long_diff))
    res_to_mile = degrees(acos(distance)) * 69.09
    # res_to_miter = res_to_mile / 0.00062137119223733
    return res_to_mile


class StudioDetailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):

        def as_json(obj):
            return dict(
                input_id=obj.id, input_user=obj.name, )

        studio = get_object_or_404(Studio, id=kwargs['studio_id'])
        geo = studio.geographical_location
        json_geo = json.loads(geo)
        classes = Class.objects.filter(studio=Studio.objects.get(id=studio.id))
        lst = []
        lst2 = []
        for cla in classes:
            dictionary = {"id": cla.id, "name": cla.name, "description": cla.description,
                          "coach": cla.coach, "capacity": cla.capacity,
                          "start_date": cla.start_date, "end_date": cla.end_date,
                          "start_time": cla.start_time, "end_time": cla.end_time}
            lst2.append(dictionary)
        for cla in classes:
            events = Event.objects.filter(classes=Class.objects.get(id=cla.id), cancel=False)
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
                # lst.append(model_to_dict(event))
        for image in studio.images.all():
            print(image.image)
        sorted_list = sorted(lst,
                             key=lambda elem: (datetime.strptime(str(elem['day']), '%Y-%m-%d'), elem['start_time']))
        print(lst2)
        return Response({
            'id': studio.id,
            'name': studio.name,
            'phone_number': studio.phone_number,
            'address': studio.address,
            'postal_code': studio.postal_code,
            'geographical_location': json_geo,
            'link': f"https://www.google.com/maps/search/?api=1&query={json_geo[0]}%2C{json_geo[1]}",
            'classes': lst2,
            'schedules': sorted_list
        })


class StudioDetailView2(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        queryset = self.model.objects.filter(id=self.kwargs['studio_id'])
        return queryset


class StudioListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GeoLocationSerializer
    model = Studio
    queryset = model.objects.all()


class StudioListSortView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        longitude = float(self.kwargs['longitude'])
        latitude = float(self.kwargs['latitude'])
        studios = Studio.objects.all()

        for studio in studios:
            geo = json.loads(studio.geographical_location)
            print(geo)
            studio.distance = calc_dist(geo[0], geo[1], latitude, longitude)
            print(studio.distance)
            studio.save()

        queryset = self.model.objects.all()
        print(queryset.order_by('distance'))
        return queryset.order_by('distance')


class StudioAmenitySearchView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        longitude = float(self.kwargs['longitude'])
        latitude = float(self.kwargs['latitude'])
        studios = Studio.objects.all()

        for studio in studios:
            geo = json.loads(studio.geographical_location)
            print(geo)
            studio.distance = calc_dist(geo[0], geo[1], latitude, longitude)
            print(studio.distance)
            studio.save()

        queryset = self.model.objects.filter(amenities__type__contains=self.kwargs['amenities_type'])
        return queryset.order_by('distance')


class StudioClassSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        longitude = float(self.kwargs['longitude'])
        latitude = float(self.kwargs['latitude'])
        studios = Studio.objects.all()

        for studio in studios:
            geo = json.loads(studio.geographical_location)
            print(geo)
            studio.distance = calc_dist(geo[0], geo[1], latitude, longitude)
            print(studio.distance)
            studio.save()

        queryset = self.model.objects.filter(classes__name__contains=self.kwargs['class_name'])
        return queryset.order_by('distance')


class StudioCoachSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        longitude = float(self.kwargs['longitude'])
        latitude = float(self.kwargs['latitude'])
        studios = Studio.objects.all()

        for studio in studios:
            geo = json.loads(studio.geographical_location)
            print(geo)
            studio.distance = calc_dist(geo[0], geo[1], latitude, longitude)
            print(studio.distance)
            studio.save()

        queryset = self.model.objects.filter(classes__coach__contains=self.kwargs['coach_name'])
        return queryset.order_by('distance')


class StudioSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GeoLocationSerializer
    model = Studio

    def get_queryset(self):
        longitude = float(self.kwargs['longitude'])
        latitude = float(self.kwargs['latitude'])
        studios = Studio.objects.all()
        studio_name = self.kwargs['studio_name']
        amenities_type = self.kwargs['amenities_type']
        class_name = self.kwargs['class_name']
        coach_name = self.kwargs['coach_name']

        for studio in studios:
            geo = json.loads(studio.geographical_location)
            print(geo)
            studio.distance = calc_dist(geo[0], geo[1], latitude, longitude)
            print(studio.distance)
            studio.save()

        queryset = self.model.objects.filter(classes__coach__exact="sdddddddhasdgasgasgdggsd24145fasgh")
        print(queryset)
        if amenities_type != "lol960609loldude":
            query1 = self.model.objects.filter(amenities__type__contains=amenities_type)
            queryset = query1
        if class_name != "lol960609loldude":
            query2 = self.model.objects.filter(classes__name__contains=class_name)
            queryset = query2.union(queryset)
        if coach_name != "lol960609loldude":
            query3 = self.model.objects.filter(classes__coach__contains=coach_name)
            queryset = query3.union(queryset)
        if studio_name != "lol960609loldude":
            query4 = self.model.objects.filter(name__contains=studio_name)
            queryset = query4.union(queryset)
        return queryset.order_by('distance')
