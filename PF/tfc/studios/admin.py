from django.contrib import admin
from studios.models import Image, Studio, Amenity
from classes.models import Class


# Register your models here.
class ImageAdmin(admin.StackedInline):
    model = Image
    extra = 0


class AmenityAdmin(admin.StackedInline):
    model = Amenity
    extra = 0


class ClassAdmin(admin.StackedInline):
    model = Class
    extra = 0


@admin.register(Studio)
class StudioAdmin(admin.ModelAdmin):

    inlines = [ImageAdmin, AmenityAdmin]

    list_display = (
        "name",
        "address",
        "postal_code",
        "phone_number",
        "geographical_location"
    )

    def get_form(self, request, obj=None, **kwargs):
        kwargs['exclude'] = ['distance', ]
        if obj:  # obj is not None, so this is a change page
            # kwargs['exclude'] = ['name', 'address', ]
            self.inlines = [ImageAdmin, AmenityAdmin]
        else:  # obj is None, so this is an add page
            kwargs['fields'] = ["name",
                                "address",
                                "postal_code",
                                "phone_number",
                                "geographical_location"]
            self.inlines = [ImageAdmin, ]
        return super(StudioAdmin, self).get_form(request, obj, **kwargs)
