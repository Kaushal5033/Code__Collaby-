class ApiError extends Error{
    constructor(statusCode,message='something went wrong through ApiError',errors=[],stack=''){
                super(message);
// super keyword: In JavaScript, when a class extends another class, 
// super() is used to call the constructor of the parent class. It allows you to initialize 
// the parent class with the necessary values before adding additional functionality or 
// properties in the child class.

// Passing message to super(message): The Error class has a constructor that accepts a message
//  argument, which is typically a string describing the error. When you call super(message), 
// it ensures that the error message is properly set up in the Error class instance.

// Why use it here?: You are subclassing the Error class, and by calling super(message), 
// you ensure that the message is set on the instance of the error object. 
// This is how you inherit the default behavior of error message handling from the Error class 
// while still extending its functionality to suit your needs.
                this.statusCode = statusCode
                this.data=null
                this.message = message
                this.success = false
                this.errors = errors
                if(stack){
                    this.stack = stack
                }else{
                    Error.captureStackTrace(this,this.contructor)
                }
    }
}
export default ApiError