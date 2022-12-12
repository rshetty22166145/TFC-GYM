chmod u+rwx run.sh
chmod u+rwx renew.sh
cd tfc
python3 -m pip install --user virtualenv
python3 -m venv env
source env/bin/activate
which python
python3 -m pip install -r requirements.txt
chmod u+rwx manage.py
./manage.py makemigrations
./manage.py migrate
cd ..
cd frontend
npm install
cd ..