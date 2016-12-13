/**
 * Created by junli on 2016/12/13.
 */
function greeter(person) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);