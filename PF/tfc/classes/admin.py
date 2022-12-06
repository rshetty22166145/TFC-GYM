from datetime import datetime
from django.contrib import admin


# Register your models here.
from classes.models import Class, Keyword, Event
from studios.models import Studio


@admin.action(description='Cancel all classes')
def cancel_classes(modeladmin, request, queryset):
    for query in queryset:
        events = Event.objects.filter(classes_id=query.id)
        for event in events:
            event.cancel = True
            event.save()


class KeywordAdmin(admin.StackedInline):
    model = Keyword
    extra = 0


class EventAdmin(admin.StackedInline):
    model = Event
    extra = 0


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):

    inlines = [KeywordAdmin, EventAdmin]

    actions = [cancel_classes, ]

    list_display = (
        "name",
        "studio",
        "id",
        "coach",
        "capacity",
    )

    def get_form(self, request, obj=None, **kwargs):
        kwargs['exclude'] = ['current_user', ]
        if obj:  # obj is not None, so this is a change page
            kwargs['exclude'] = ['current_user', 'recurrence', 'start_date', 'end_date']
            self.inlines = [KeywordAdmin, EventAdmin]
        else:  # obj is None, so this is an add page
            self.inlines = [KeywordAdmin, ]
        return super(ClassAdmin, self).get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change:
            recurrences = obj.recurrence.between(datetime.combine(obj.start_date, obj.start_time),
                                                 datetime.combine(obj.end_date, obj.end_time),)
            for recur in recurrences:
                Event.objects.create(classes=Class.objects.get(id=obj.id), day=recur.date(),
                                     start_time=obj.start_time, end_time=obj.end_time)
        else:
            events = Event.objects.filter(classes=Class.objects.get(id=obj.id))
            for event in events:
                event.start_time = obj.start_time
                event.end_time = obj.end_time
                event.save()
