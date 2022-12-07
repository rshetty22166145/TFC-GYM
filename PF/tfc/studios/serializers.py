from rest_framework import serializers

from studios.models import Studio, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']
        depth = 1


class GeoLocationSerializer(serializers.ModelSerializer):
    imagesSerializer = ImageSerializer(many=True, source='images')

    class Meta:
        model = Studio
        fields = ['id', 'name', 'geographical_location', 'amenities', 'classes', 'phone_number', 'postal_code', 'imagesSerializer']
