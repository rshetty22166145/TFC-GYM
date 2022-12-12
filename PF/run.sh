cd tfc
source env/bin/activate
./manage.py migrate
./manage.py runserver &
cd ..
cd frontend
npm start