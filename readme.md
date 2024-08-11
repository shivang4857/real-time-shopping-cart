firebase security rules 
 ".read" : "auth != null && auth.uid === $uid" ,
 auth != null: This checks if the user is authenticated (i.e., auth is not null).
auth.uid === $uid: This ensures that the authenticated user's UID matches the UID of the data they are trying to access. In other words, a user can only read their own data

and same conditions goes for the write functions

in test mode can onw ith the link can edit the database for 30 days 

// fire base function which we have used in this project
ref
onvalue fetch the data from the db  onvalue( dbref , functions(snapshot) {
    console.log(snapshot.value)
})
intializeapp -:
get database

you can change these limit by changing the rules in the rules tab of firebase console .

to covert js object to string we can use object method indeed
it has 3 method inside
object.values
object.keys
object.entries 


// firebase  authentication

first we will intialize the auth by import the required function 
and put the api key in the intialiize db section then

give the provider name which you are using
and then write a function to call the signupwithpop
we also want to call the onauthstatechange which moniter auth in the js file and change the state of our app

// fetching user specific data from the db 
nw we have to change our ref in the app and data with be pushed according the userid only.

