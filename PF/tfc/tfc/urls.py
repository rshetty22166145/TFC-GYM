"""tfc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts import views as accounts_views
from studios import views as studio_views
from classes import views as class_views
from subscriptions import views as subscription_views

router = routers.DefaultRouter()
router.get_api_root_view().cls.__name__ = (
    "Toronto Fitness Club"  # customize the name of the root view (shown in the browsable API)
)
router.get_api_root_view().cls.__doc__ = "Fully browsable API for the Toronto Fitness Club project."

# ADDITION: connect the rest viewsets to the router using router.register
router.register("accounts", accounts_views.AccountsAPIViewSet, basename="accounts")
router.register("subscriptions", subscription_views.SubscriptionsAPIViewSet, basename="subscriptions")
urlpatterns = [
    path('admin/', admin.site.urls),
    # api urls
    path("api/auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include(router.urls)),  # ADDITION: include the api urls
    path("api/accounts/<str:username>/schedule/", accounts_views.AccountsSchedulePageView.as_view()),
    path("api/accounts/<str:username>/history/",  accounts_views.AccountsHistoryPageView.as_view()),
    path("api/accounts/<str:username>/enrol/",  accounts_views.AccountsClassEnrolView.as_view()),
    path("api/accounts/<str:username>/drop/",  accounts_views.AccountsClassDropView.as_view()),
    path("studios/", studio_views.StudioListView.as_view(), name='studio_all'),
    path("studios/<str:latitude>/<str:longitude>/", studio_views.StudioListSortView.as_view(), name='studio_sort'),
    path("studios/<str:latitude>/<str:longitude>/amenities/<str:amenities_type>/",
         studio_views.StudioAmenitySearchView.as_view(), name='studio_search_amenities'),
    path("studios/<str:latitude>/<str:longitude>/class/<str:class_name>/",
         studio_views.StudioClassSearchView.as_view(), name='studio_search_class'),
    path("studios/<str:latitude>/<str:longitude>/coach/<str:coach_name>/",
         studio_views.StudioCoachSearchView.as_view(), name='studio_search_coach'),
    path("studios/<str:latitude>/<str:longitude>/search/<str:studio_name>/<str:class_name>/<str:coach_name>/<str:amenities_type>/",
         studio_views.StudioSearchView.as_view(), name='studio_search'),
    path("studios/<int:studio_id>/", studio_views.StudioDetailView.as_view(), name='studio_detail'),
    path("studios/<int:studio_id>/d/t/", studio_views.StudioDetailView2.as_view(), name='studio_detail2'),
    path("studios/<int:studio_id>/class/<str:class_name>/",
         class_views.ClassNameSearchView.as_view(), name='detail_search_class'),
    path("studios/<int:studio_id>/coach/<str:coach_name>/",
         class_views.ClassCoachSearchView.as_view(), name='detail_search_coach'),
    path("studios/<int:studio_id>/date/<str:year>-<str:month>-<str:day>/start/",
         class_views.ClassDateStartView.as_view(), name='detail_search_date_start'),
    path("studios/<int:studio_id>/date/<str:year>-<str:month>-<str:day>/end/",
         class_views.ClassDateEndView.as_view(), name='detail_search_date_end'),
    path("studios/<int:studio_id>/date/<str:year>-<str:month>-<str:day>/<str:year2>-<str:month2>-<str:day2>/",
         class_views.ClassDateRangeView.as_view(), name='detail_search_date_range'),
    path("studios/<int:studio_id>/time/<str:hour>-<str:min>-<str:sec>/<str:hour2>-<str:min2>-<str:sec2>/",
         class_views.ClassTimeRangeView.as_view(), name='detail_search_time_range'),
    path("studios/<int:studio_id>/h/b/",
         class_views.ClassSearchSimpleView.as_view(), name='detail_simple_search'),
    path("studios/<int:studio_id>/search/<str:year>-<str:month>-<str:day>/<str:year2>-<str:month2>-<str:day2>/<str:hour>-<str:min>-<str:sec>/<str:hour2>-<str:min2>-<str:sec2>/<str:class_name>/<str:coach_name>/",
         class_views.ClassSearchView.as_view(), name='detail_search'),
    path("classes/<int:class_id>/", class_views.ClassDetailView.as_view(), name='class_detail'),
    path("classes/<int:class_id>/search/<str:year>-<str:month>-<str:day>/<str:year2>-<str:month2>-<str:day2>/<str:hour>-<str:min>-<str:sec>/<str:hour2>-<str:min2>-<str:sec2>/", class_views.ClassIdSearchView.as_view(), name='class_id_detail'),
    path("classes/<int:class_id>/h/b/", class_views.ClassIdSimpleSearchView.as_view(), name='class_id_simple_detail'),
    path("payments/<str:username>/", subscription_views.PaymentsListView.as_view(), name='payments_history'),
    path("plans/", subscription_views.SubscriptionPlansListView.as_view(), name='plans_all'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
