from rest_framework import serializers
import datetime
from django.utils.translation import gettext_lazy as _
from subscriptions.models import UserPayments, UserSubscription, SubcriptionPlan  # We import the models
from accounts.serializers import RestrictedUserSerializer, UserSerializer
from dateutil.relativedelta import relativedelta
# from ..accounts.serializers import RestrictedUserSerializer
from rest_framework.response import Response
from classes.models import Event


class UserSubscriptionCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context['request'].user
        username = self.context['request'].user.username
        curr_plan = validated_data['curr_plan']
        renew = validated_data['renew']
        pay_date = datetime.datetime.today()
        pay_time = datetime.datetime.today().time()
        cardnumber = validated_data['cardnumber']
        cvv = validated_data['cvv']
        expiry = validated_data['expiry']
        amount = validated_data['curr_plan'].price
        if curr_plan.plan == "Yearly":
            next_pay = datetime.datetime.today() + relativedelta(months=12)
            UserPayments.objects.create(user=user, cardnumber=cardnumber, pay_date=pay_date, pay_time=pay_time,
                                        amount=amount, username=username, next_pay=next_pay)
            return UserSubscription.objects.create(user=user, curr_plan=curr_plan, renew=renew, last_paid=pay_date,
                                                   cardnumber=cardnumber, cvv=cvv, expiry=expiry, next_pay=next_pay,
                                                   username=username)
        if curr_plan.plan == "Monthly":
            next_pay = datetime.datetime.today() + relativedelta(months=1)
            UserPayments.objects.create(user=user, cardnumber=cardnumber, pay_date=pay_date, amount=amount,
                                        username=username, next_pay=next_pay, pay_time=pay_time,)
            return UserSubscription.objects.create(user=user, curr_plan=curr_plan, renew=renew, last_paid=pay_date,
                                                   cardnumber=cardnumber, cvv=cvv, expiry=expiry, next_pay=next_pay,
                                                   username=username)
        return UserSubscription.objects.create(user=user, curr_plan=curr_plan, renew=renew, last_paid=pay_date,
                                               cardnumber=cardnumber, cvv=cvv, expiry=expiry, username=username)

    def validate(self, attrs):
        if self.context['request'].user.username in UserSubscription.objects.values_list('username', flat=True):
            raise serializers.ValidationError({"User has a plan already, cannot create another."})
        return attrs

    class Meta:
        model = UserSubscription
        fields = ("cardnumber", "curr_plan", "renew", "last_paid", "cvv", "expiry")


class UserSubscriptionViewSerializer(serializers.ModelSerializer):
    curr_plan = serializers.SerializerMethodField()

    def get_curr_plan(self, obj):
        print(obj.curr_plan)
        dictionary = {"id": obj.curr_plan.id, "name": obj.curr_plan.name}
        return dictionary

    class Meta:
        model = UserSubscription
        fields = ["user", "username", "last_paid", "next_pay", "cardnumber", "curr_plan", "renew", "cvv", "expiry"]
        read_only_fields = ["user", "username", "pay_date", "next_pay"]

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.username = validated_data.get('username', instance.username)
        instance.last_paid = validated_data.get('last_paid', instance.last_paid)
        instance.cardnumber = validated_data.get('cardnumber', instance.cardnumber)
        instance.curr_plan = validated_data.get('curr_plan', instance.curr_plan)
        instance.renew = validated_data.get('renew', instance.renew)
        instance.cvv = validated_data.get('cvv', instance.cvv)
        instance.expiry = validated_data.get('expiry', instance.expiry)
        instance.save()

        no_subs = UserSubscription.objects.filter(renew=False)
        for subscription in no_subs:
            user = subscription.user
            date = subscription.next_pay
            events = Event.objects.filter(day__gte=date)
            for event in events:
                event.students.remove(user)

        return instance


class UserSubscriptionEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = ["user", "username", "last_paid", "next_pay", "cardnumber", "curr_plan", "renew", "cvv", "expiry"]
        read_only_fields = ["user", "username", "pay_date", "next_pay"]

    def update(self, instance, validated_data):
        print(validated_data.get('renew', instance.renew))
        instance.user = validated_data.get('user', instance.user)
        instance.username = validated_data.get('username', instance.username)
        instance.last_paid = validated_data.get('last_paid', instance.last_paid)
        instance.cardnumber = validated_data.get('cardnumber', instance.cardnumber)
        instance.curr_plan = validated_data.get('curr_plan', instance.curr_plan)
        instance.renew = validated_data.get('renew', instance.renew)
        instance.cvv = validated_data.get('cvv', instance.cvv)
        instance.expiry = validated_data.get('expiry', instance.expiry)
        instance.save()

        no_subs = UserSubscription.objects.filter(renew=False)
        for subscription in no_subs:
            user = subscription.user
            date = subscription.next_pay
            events = Event.objects.filter(day__gte=date)
            for event in events:
                event.students.remove(user)

        return instance


class UserPaymentsViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPayments
        fields = ["user", "username", "pay_date", "cardnumber", "amount", "next_pay", "pay_time"]


class SubscriptionPlansViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubcriptionPlan
        fields = ["id", "name", "price", "plan", "description"]
