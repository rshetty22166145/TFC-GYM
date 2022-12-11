import json

from rest_framework import serializers

from classes.models import Class
from studios.models import Studio, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']
        depth = 1


class GeoLocationSerializer(serializers.ModelSerializer):
    imagesSerializer = ImageSerializer(many=True, source='images')

    amenities = serializers.SerializerMethodField()
    geographical_location = serializers.SerializerMethodField()
    classes = serializers.SerializerMethodField()

    def get_geographical_location(self, obj):
        return json.loads(obj.geographical_location)

    def get_amenities(self, obj):
        lst = []
        print(obj.amenities.all())
        for amenity in obj.amenities.all():
            lst.append(amenity.type)
        return lst

    def get_classes(self, obj):
        lst = []
        print(obj.classes.all())
        print(obj)
        classes = Class.objects.filter(studio=obj)
        print(classes)
        for cla in obj.classes.all():
            dictionary = {"id": cla.id, "name": cla.name, "description": cla.description}
            lst.append(dictionary)
        return lst

    class Meta:
        model = Studio
        fields = ['id', 'name', 'geographical_location', 'amenities', 'classes', 'phone_number', 'postal_code', 'imagesSerializer', 'address']
