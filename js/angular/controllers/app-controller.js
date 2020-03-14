/**
 * Created by Andrei on 7/23/2016.
 */

angular.module('highclassApp')
    .controller('AppController', ['$scope', '$interval', function (a, b) {

        a.$on('$routeChangeSuccess', function() {
            // Header Init
            if ($(window).height() > $(window).width()) {
                var ratio = $('.parallax').width() / $('.parallax').height();
                $('.parallax img').css('height', ($(window).height()) + 'px');
                $('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
            }

            $('header').height($(window).height() + 80);
            $('section .cut').each(function() {
                if ($(this).hasClass('cut-top'))
                    $(this).css('border-right-width', $(this).parent().width() + "px");
                else if ($(this).hasClass('cut-bottom'))
                    $(this).css('border-left-width', $(this).parent().width() + "px");
            });

            // Sliders Init
            $('.owl-schedule').owlCarousel({
                singleItem: true,
                pagination: true,
                autoPlay:3000
            });
            $('.owl-testimonials').owlCarousel({
                singleItem: true,
                pagination: true,
                autoPlay:3000
            });
            $('.owl-twitter').owlCarousel({
                singleItem: true,
                pagination: true,
                autoPlay:3000
            });
            $('.modal-popup .close-link').click(function(event){
                event.preventDefault();
                $('#modal1').modal('hide');
            });
        });
        $('.pricing .box-main').click(function() {
            $('.pricing .box-main').removeClass('active');
            $('.pricing .box-second').removeClass('active');
            $(this).addClass('active');
            $(this).next($('.box-second')).addClass('active');
            $('#pricing').css("background-image", "url(" + $(this).data('img') + ")");
            $('#pricing').css("background-size", "cover");
        });
        a.open_close = function() {
            var isOpenStatus = firebase.database().ref('isOpen');
            isOpenStatus.on('value', function(snapshot) {
                a.isOpen = snapshot.val().isOpen;
                a.isClosed = !snapshot.val().isOpen
            });
            var updates = {};
            updates['isOpen/isOpen'] = !a.isOpen;
            if(!a.$$phase) {
                a.$apply(updates);
            }
            return firebase.database().ref().update(updates);
        }
        a.getSchedule = function(){
            var isOpenStatus = firebase.database().ref('isOpen');
            isOpenStatus.on('value', function(snapshot) {
                a.isOpen = snapshot.val().isOpen;
                a.isClosed = !snapshot.val().isOpen
                if(!a.$$phase) {
                    a.$apply();
                }
            });
        }
        b(function() {
            var date = new Date()
            var d = date.getDay();
            var h = date.getHours();
            if((d === 6 && h < 9) || (d === 6 && h > 17)){
                a.isOpen = false;
                a.isClosed = true;
            }else if (d === 0 || h < 9 || h > 21){
                a.isOpen = false;
                a.isClosed = true;
            }else if((d !== 6 && d !== 0) && (h < 9 || h >= 21)){
                a.isOpen = false;
                a.isClosed = true;
            }
            else {
                a.isOpen = true;
                a.isClosed = false;
            }
        }, 1000);
    }]);