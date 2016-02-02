Form inputs that automagically save data to collection
==============================================================================
## Installation for Meteor

```shell
meteor add jaaaco:editable
```

## Basic usage

```html
<input type="text" class="editable" data-collection="Clients" data-id="{{_id}}" data-field="name" value="{{name}}" />
```

If you have all inputs enclosed in a <form>, you may provide collection and id params only once:

```html
<form data-collection="Clients" data-id="{{_id}}">
    <input type="text" class="editable" data-field="name" value="{{name}}" />
    <textarea class="editable" data-field="description">{{description}}</textarea>
</form>
```

## Optional parameters

* data-format - currency | int | ceil
