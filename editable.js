$(function(){
    'use strict';

    $('body').on('change', 'input[type="checkbox"].editable', function(){
        var field = $(this).attr('data-field');
        var collection = $(this).attr('data-collection');
        var id = $(this).attr('data-id');

        if (!collection) {
            collection = $(this).closest('form').attr('data-collection');
            id = $(this).closest('form').attr('data-id');
        }

        if (!collection || !id) {
            alert('Error: No collection or id found');
        }

        var data = {};
        data[field] = $(this).is(':checked');

        var collectionObject = collection === 'Meteor.users' ? Meteor.users : window[collection];

        if (data[field]) {
            collectionObject.update({_id: id},{$set: data});
        } else {
            collectionObject.update({_id: id},{$unset: data});
        }
    });

    $('body').on('change', 'select.editable', function(){
        var field = $(this).attr('data-field');
        var collection = $(this).attr('data-collection');
        var id = $(this).attr('data-id');
        if (!collection) {
            collection = $(this).closest('form').attr('data-collection');
            id = $(this).closest('form').attr('data-id');
        }

        if (!collection || !id) {
            alert('Error: No collection or id found');
        }

        var data = {};
        data[field] = $(this).val();

        var collectionObject = collection === 'Meteor.users' ? Meteor.users : window[collection];
        collectionObject.update({_id: id},{$set: data});

    });

    $('body')
        .on('click', ':text[data-format]', function () {
            $(this).select();
        })
        .on('change', ':text[data-format]', function () {
            switch ($(this).data().format) {
                case 'currency':
                    this.value = this.value.replace(',','.');
                    this.value = this.value.replace(' ','');
                    this.value = parseFloat(numeral(this.value).value());
                    break;
                case 'int':
                    this.value = this.value.replace(',','.');
                    this.value = this.value.replace(' ','');
                    this.value = parseFloat(numeral(parseInt(this.value)).value());
                    break;
                case 'ceil':

                    this.value = this.value.replace(',','.');
                    this.value = this.value.replace(' ','');
                    this.value = parseFloat(numeral(Math.ceil(this.value)).value());
                    break;
            }

            var field = $(this).data().field,
                collection = $(this).data().collection,
                id = $(this).data().id;

            if (!collection) {
                collection = $(this).closest('form').attr('data-collection');
                id = $(this).closest('form').attr('data-id');
            }

            if (!collection || !id) {
                alert('Error: No collection or id found');
            }

            var data = {};
            data[field] = $(this).val();
            data[field] = numeral(data[field]).value();

            var collectionObject = collection === 'Meteor.users' ? Meteor.users : window[collection];
            collectionObject.update({_id: id},{$set: data});
        });

    $('body').on('change', 'form[data-collection] textarea[data-field], form[data-collection] :text[data-field], form[data-collection] input[type=email],form[data-collection] input[type=password], form[data-collection] input[type=number]', function (e, isFormated) {
        var field = $(this).data().field,
            collection = $(this).data().collection,
            id = $(this).data().id;

        if (!isFormated && $(this).data().format) {
            return;
        }

        if (!collection) {
            collection = $(this).closest('form').attr('data-collection');
            id = $(this).closest('form').attr('data-id');
        }

        if (!collection || !id) {
            console.log('Error: No collection or id found', collection, id, this);
        }

        var data = {};
        data[field] = $(this).val();

        if (isFormated) {
            data[field] = numeral(data[field]).value();
        }

        var collectionObject = collection === 'Meteor.users' ? Meteor.users : window[collection];
        collectionObject.update({_id: id},{$set: data}, function (error, result) {
            if (error) {
                console.log('Editable error in field:', field, error);
                toastr['error'](error.reason);
            }
        });

    });
});
