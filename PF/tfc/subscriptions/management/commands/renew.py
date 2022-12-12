from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.core.management.base import BaseCommand, CommandError

from classes.models import Event
from subscriptions.models import UserSubscription, UserPayments


class Command(BaseCommand):
    help = 'Renew subscriptions and cancel bookings of non-subscribed users'

    def handle(self, *args, **options):
        subs = UserSubscription.objects.filter(next_pay__lte=datetime.today(), renew=True)
        i = 0
        for subscription in subs:
            if subscription.curr_plan.plan == "Yearly":
                subscription.next_pay = datetime.today() + relativedelta(months=12)
            elif subscription.curr_plan.plan == "Monthly":
                subscription.next_pay = datetime.today() + relativedelta(months=1)
            subscription.pay_date = datetime.today()
            subscription.save()
            UserPayments.objects.create(user=subscription.user, cardnumber=subscription.cardnumber,
                                        pay_date=subscription.pay_date, amount=subscription.curr_plan.price,
                                        username=subscription.username, next_pay=subscription.next_pay)
            i += 1
        self.stdout.write(f"{i} subscription payments done!")

        no_subs = UserSubscription.objects.filter(renew=False)
        i = 0
        for subscription in no_subs:
            user = subscription.user
            date = subscription.next_pay
            events = Event.objects.filter(day__gte=date)
            for event in events:
                event.students.remove(user)
            i += 1
        self.stdout.write(f"{i} non-subscribed users class bookings are cancelled")

        no_subs2 = UserSubscription.objects.filter(next_pay__lte=datetime.today(), renew=False)
        i = 0
        for subscription in no_subs2:
            subscription.delete()
            i += 1
        self.stdout.write(f"{i} non-subscribed users subscription deleted.")
