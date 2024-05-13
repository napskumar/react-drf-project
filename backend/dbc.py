from mysql import connector as cnt

mydb = cnt.connect(user='root',password='password',host='localhost')

mycur = mydb.cursor()

mycur.execute('create database taskdb')