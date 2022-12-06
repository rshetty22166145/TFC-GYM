from django.contrib import admin
from . import models
# Register your models here.

class SubcriptionPlanFeaturesAdmin(admin.StackedInline):
    model = models.SubcriptionPlanFeatures
    extra = 0

class SubscriptionPlanAdmin(admin.ModelAdmin):
    inlines = [SubcriptionPlanFeaturesAdmin, ]
    list_display=(['name','price','plan'])
admin.site.register(models.SubcriptionPlan,SubscriptionPlanAdmin)

class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display=(['user','curr_plan'])
admin.site.register(models.UserSubscription,UserSubscriptionAdmin)

class UserPaymentsAdmin(admin.ModelAdmin):
    list_display=(['user','amount','pay_date'])
admin.site.register(models.UserPayments,UserPaymentsAdmin)
