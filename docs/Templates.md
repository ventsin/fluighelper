# Templates
This is likely the simplest part of Fluig Helper, yet the most important. It is required for most components to work.

## Usage
To get ready-to-insert HTML, simply call `Templates.render` with the template's parameters:
```js
let mydiv = $("#mydiv");

let html = Templates.render("btnBase", {
    id: 'mybutton',
    body: "Um Botão!"
});

mydiv.append(html);
```

While this is a silly example, and this template is almost certainly useless, it's easy to see how it works and why the template mechanism is so useful.  
There are much more useful templates within the library, but these are generally very specific for each use.

While unlikely that you'll need it, you can create your own templates:
```js
Templates.custom_templates["myTemplate"] = _params => {
    return `<h1 id="${_params.id}">${_params.body}</h1>`;
};
```

Another silly example, and a most certainly useless template! Yet it is once again easy to see how it works. Every template is a function that uses its parameters to fill out a premade HTML string. Your templates can become very complex depending on the parameters, so you using this mechanism helps keep the HTML portion of your code separate from your JavaScript.

## Why?
Do you ever think to yourself: "Boy, I sure have a lot of random HTML strings on my Javascript, it's impossible to know what's going on!"?  
No?  
Well I do.

Let's face it: you're likely never going to use this library directly, since it's unlikely that you'll ever need to create complex elements on the fly like the rest of Fluig Helper does.  
But who knows? Maybe you will indeed need to create and reuse real time, complex HTML that will be a pain to write out everytime.  
:)