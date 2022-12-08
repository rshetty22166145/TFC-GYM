import json

from rest_framework import serializers

from studios.models import Studio, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']
        depth = 1


class GeoLocationSerializer(serializers.ModelSerializer):
    imagesSerializer = ImageSerializer(many=True, source='images')

    geographical_location = serializers.SerializerMethodField()

    def get_geographical_location(self, obj):
        return json.loads(obj.geographical_location)

    class Meta:
        model = Studio
        fields = ['id', 'name', 'geographical_location', 'amenities', 'classes', 'phone_number', 'postal_code', 'imagesSerializer']
