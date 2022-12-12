from django.db import models
from geolocation_fields.models import fields

# Create your models here.
class Studio(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    geographical_location = fields.PointField(default=[43.66101335719982, -79.39593138840402])
    distance = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='images/')

class Amenity(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='amenities')
    type = models.CharField(max_length=200)
