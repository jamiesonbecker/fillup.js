fillup.js
=========

*FillUp is a tiny (1 line!) jQuery plugin and pure HTML templater.*

The short story is that it just clones a source div and fills up the destination div with that copy -- and the long story is only slightly more complicated that that.

How is this useful?
-------------------

Let's say that you have an HTML page:

    <html>
        <body>

            <!-- this is where you display everything -- your 'stage' -->
            <div class=stage></div>

            <!-- this is where you keep all your templates -- offstage -->
            <div style="display:none">

                <div class=page1-offstage>page1</div>
                <div class=page2-offstage>page2</div>
                <div class=page3-offstage>page3</div>
                <div class=page4-offstage>page4</div>

            </div>
        </body>
    </html>

Let's say that you want to display page 2: *(note the class name without the "." or "-offstage")*

    page2 = $(".stage").fillup("page2");

Now, any changes you make to page2 will *not* also be made in the offstage version -- it's a complete copy!

    page2.html("<h2>page 2</h2>");

The offstage version stays the same as it was originally, but the onstage version now has a headline!

You can create as many copies as you want with different classnames, modify them individually, and attach event handlers to them all, *all without trashing your original!*

(Most HTML templaters can't actually work with real source HTML for just this reason.)

**In other words, this gives you pure HTML templates,.. without complex templates. Simple, right?**

You just use regular jquery code, CSS selectors, etc to modify your template. No variables, no weird template language, just clean separation of view (presentation/html) from controller logic (which stays javascript, where it should be).

And in one just action-packed line of code... now, here's where it gets REALLY useful:

Using FillUp with dynamic templates like forms
----------------------------------------------

Let's say instead that you have an address book application:

    <html>
        <body>
            <div>
                <div class=contact1></div>
                <div class=contact2></div>
            </div>
            <div style="display:none">
                <div class=contactform-offstage>
                    <form>
                        <input name="firstname" placeholder="First Name" />
                        <input name="lastname" placeholder="Last Name" />
                        <input name="email" placeholder="Email Address" />
                    </form>
                </div>
            </div>
        </body>
    </html>

Now, you can do something like this:

    contact1 = $(".contact1").fillup("contactform");
    contact2 = $(".contact2").fillup("contactform");

Now you have two form copies that are all independently identifiable -- just use the "contact1" classname however you like! Here's what the DOM looks like now:


    <html>
        <body>
            <div>
                <div class=contact1>
                    <div class=contactform>
                        <form>
                            <input name="firstname" placeholder="First Name" />
                            <input name="lastname" placeholder="Last Name" />
                            <input name="email" placeholder="Email Address" />
                        </form>
                    </div>
                </div>
                <div class=contact2>
                    <div class=contactform>
                        <form>
                            <input name="firstname" placeholder="First Name" />
                            <input name="lastname" placeholder="Last Name" />
                            <input name="email" placeholder="Email Address" />
                        </form>
                    </div>
                </div>
            </div>
            <div style="display:none">
                <form class=contactform-offstage>
                    <input name="firstname" placeholder="First Name" />
                    <input name="lastname" placeholder="Last Name" />
                    <input name="email" placeholder="Email Address" />
                </form>
            </div>
        </body>
    </html>


Even better, now you can do something like this, using my [formplode.js](https://github.com/jamiesonbecker/formplode.js) plugin:

    $(".contact1 form").formplode({
        firstname: "Jamieson",
        lastname: "Becker",
        email: "jamieson@jamiesonbecker.com"
    });
    
    $(".contact2 form").formplode({
        firstname: "Your",
        lastname: "Name",
        email: "you@somewhere.com"
    });

Or, using the power of jQuery (assuming contact1data is a JSON dictionary):

    contact1 = $(".contact1").fillup("contactform").find("form").formplode(contact1data);

Who needs templates?

This is also really useful if you're building a lot of drop-down menu entries, table rows, etc;  let's say that you're displaying a list of items, and you want to display menus next to each of them to do things like delete, rename, edit, etc. Just create a new offstage template for each item and modify on the fly!


How to Use
----------

Just specify your offstage (template) class names with -offstage and ideally wrap them all in a display:none div. Then use fillup!

    $(destination).fillup(source)

... where destination is the div that will get emptied and filled, and the source is the -offstage div that will get cloned.


Important notes
---------------

1.  The source div (source-offstage) does not actually get cloned. A new `<div>` is created with the same classname, minus the '-offstage' suffix, and then all of the original source-offstage's children get cloned and placed inside of the new `<div>`.

    This is an important thing to realize if you're cloning things like `<form>`'s... they'll get converted to `<div>`'s! Instead, wrap the `<form>` in a `<div>` as shown above.

2.  As always, you still need to be specific for inner elements. $("input") will still select all input's on the page! $(".contact1 input") would select all inputs in contact1, of course. If you're not specific about your top-level container, you could end up changing your original, or attaching methods to the wrong objects, so be careful about that.

3.  Related to #2, if you notice weird behavior such as events that are firing on more than one div or previous data is coming in from offstage, you're probably modifying offstage elements without realizing it and since you can't see them it's not immediately obvious. Be careful to narrow down your targets -- that's why this plugin exists in the first place! Otherwise you could just .clone() and be done with it.



Implications
------------

Think about it... with this one-liner plugin and the formplode/formscrape plugins below, **do you even need that huge framework anymore?**



Related
-------

See [formscrape.js](https://github.com/jamiesonbecker/formscrape.js) for a plugin that scrapes data from a filled-in form and munges it into a nice Javascript object (JSON).
See [formplode.js](https://github.com/jamiesonbecker/formplode.js) for a plugin that explodes JSON data onto an empty form and fills in the empty fields.

