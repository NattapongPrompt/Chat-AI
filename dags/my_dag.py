
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

default_args = {

}

with DAG(
    "my_dag",
    start_date=datetime(2023, 1, 1),
    schedule_interval="@daily",
    default_args=default_args,
    catchup=False,
) as dag:

    task_1 = BashOperator(
        task_id="print_date",
        bash_command="date"
    )
 