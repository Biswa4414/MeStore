const logout = document.getElementById('logout');
const input1 = document.getElementById('inputs');
const input2 = document.getElementById('input2');

//if user data not stored in localstorage then user go to login page else make user data object and get the value of firstname & lastname

if(!localStorage.getItem('currUser')){
    location.href = '../login/index.html';
}
else{
    let user = JSON.parse(localStorage.getItem('currUser'));
    document.getElementById('first-name').value = user.firstName;
    document.getElementById('last-name').value = user.lastName;
}

//Then we add a eventListener on logout button when we submit it, its prevent default & print hello then its remove the currUser data & redirect to the login page 

logout.addEventListener('submit',event=>{
    event.preventDefault;
    console.log("Hello");
    localStorage.removeItem('currUser');
    location.href = '../login/index.html';
})

//Next we create a eventListener on input1 if we submit then its prevent default & get the firstName & lastName

input1.addEventListener('submit',event=>{
    event.preventDefault;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    //Then we check is user filled both the firstName & lastName field if false user will get a error else make his data to object then get the value & again take the value of the user & make it currUser

    if(!firstName || !lastName){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red');
        document.getElementById('message').innerText='Error: All Fields are madatory'
        return;
    }
    
    let user = JSON.parse(localStorage.getItem('currUser'));

    user.firstName = firstName;
    user.lastName = lastName;
    let email = user.email;

    localStorage.setItem('currUser',JSON.stringify(user));

    // Then get the totalUser data from localStorage & make it object

    let totalUser = JSON.parse(localStorage.getItem('totalUser'));
    let ind;

//     It retrieves the list of all users from the localStorage by parsing the JSON string stored under the key 'totalUser'.
// The code searches for the user with the matching email in the totalUser array and updates their firstName and lastName properties.
// The updated user object is then placed back into the totalUser array at the corresponding index.
// The modified totalUser array is stored back in the localStorage under the key 'totalUser'.

   console.log('email',email);
   console.log('total',totalUser);

    totalUser.forEach((ele,index)=>{
        if(ele.email==email){
            console.log(ele);
            user = ele;
            ind=index;
        }
    })

    user.firstName=firstName;
    user.lastName=lastName;

    totalUser[ind]=user;

    localStorage.setItem('totalUser',JSON.stringify(totalUser));

    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Profile Edited Successfully';

    setTimeout(()=>{
        document.getElementById('message').style.display='none';
        input1.reset();
    },1500)
})

input2.addEventListener('submit',(event)=>{
    event.preventDefault();

    const oldPass=document.getElementById('old-pass').value;
    const newPass=document.getElementById('new-pass').value;
    const confNewPass=document.getElementById('conf-new-pass').value;
   

    if(!oldPass || !newPass || !confNewPass){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error :All Fields are Mandatory.'
        return;
    }

    if(newPass!=confNewPass){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error :New Password and Confirm New Password are not same.'
        return;
    }

    let user =JSON.parse(localStorage.getItem('currUser'));
    console.log(user);

    if(oldPass!=user.password){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error : Wrong Old Password .'
        return;
    }

    user.password=newPass;
    let email=user.email;

    localStorage.setItem('currUser',JSON.stringify(user));

    console.log('email',email);

    let totalUser = JSON.parse(localStorage.getItem('totalUser'));

    let ind;

    totalUser.forEach((ele,index)=>{
        if(ele.email==email){
            console.log(ele);
            user=ele;
            ind=index;
        }
    })

    
    user.password=newPass;

    totalUser[ind]=user;

    localStorage.setItem('totalUser',JSON.stringify(totalUser));

    document.getElementById('message2').style.display='inline';
    document.getElementById('message2').setAttribute('class','green')
    document.getElementById('message2').innerText='Password Changed Successfully';

    setTimeout(()=>{
        document.getElementById('message2').style.display='none';
        input2.reset();
    },1500)

})








  