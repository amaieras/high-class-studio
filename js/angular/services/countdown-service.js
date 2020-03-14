/**
 * Created by Andrei on 11/17/2016.
 */
highclassApp.service('CountdownService',function(){
    return{
        getCountdownApp: function(callback){
            var fireObject;
            firebase.database().ref().on('value',function(snapshot){
                fireObject = snapshot.val().baseCount;
                callback(fireObject)
            })
        },
        decrementCountdownApp: function(){
            var currentCount = 0;
            var updates = {};
            firebase.database().ref().on('value',function(snapshot){
                currentCount = snapshot.val().baseCount;
            })
            updates['baseCount'] = currentCount - 1;
            return firebase.database().ref().update(updates);

        }
    }


})