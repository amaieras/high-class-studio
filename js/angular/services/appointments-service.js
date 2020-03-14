/**

 * Created by Andrei on 11/12/2016.

 */





highclassApp.service('AppointmentService',function(){

    var obj = {};

    return {

        getAppointments: function(fireObject, firebase){

            if (fireObject !== null) {

                var arr = [];

                for (var key in fireObject) {

                    // skip loop if the property is from prototype

                    if (!fireObject.hasOwnProperty(key)) continue;

                    for (var attrname in fireObject[key]) { obj[attrname] = fireObject[key][attrname]; }

                    obj = fireObject[key];

                    for (first in obj){

                        obj[first].dateAdded = new Date(obj[first].dateAdded);

                        arr.push(obj[first]);

                    }

                }

                firebase.database().ref().child("appointments").on('child_added',function(){

                                var audio = new Audio('videos/notification.mp3');

                                audio.play();

                            });

                return arr;

            }

        },

        addAppointment: function(name, email, phone){

            var appointmentData = {

                name: name,

                firstname: ' ',

                email: email,

                phone: phone,

                date: false,

                done: false,

                dateAdded: new Date()

            };

            var newAppKey = firebase.database().ref().child('appointments').push().key;

            return firebase.database().ref().child("appointments/" + appointmentData.name   + "/" + newAppKey).update(appointmentData);



        },

        checkPhoneValidity: function(phone) {

            phone = phone.toString().length < 10 ? ("0" + phone) : phone;

            if (phone.toString().length < 10) {

                return false;

            }

            return true;

        }

    }





})