---
layout: blog-post
title: "How to debug anything in RubyMine"
date: 2014-01-09 09:19:59 -0500
comments: true
categories: 
---

RubyMine has an excellent step-through debugger which lets you set breakpoints in your code and trace through the
program. I use RubyMine's debugger all the time and I find it to be an especially useful feature for exploring all of
the metaprogramming going on behind the scenes in Ruby on Rails. To run the debugger, simply set up a configuration
and hit the debug button on the toolbar. RubyMine will then launch the rails server in its own instance of the
command terminal, which you can view in the output window at the bottom of the screen.

{% img /resources/2014-01-09-how-to-debug-anything-in-rubymine/screen_layout.png %}

<div class="caption">
Figure 1: RubyMine's trace debugger at work
</div>

The debugger can only run by tying itself to a Ruby related command line program. In most cases this will be a call to
```Rails server```.  Using the "Edit Configurations" dialog box, you can use the debugger on other Ruby related
executables besides Rails such as Cucumber, RSpec, Rack, or IRB.

{% img /resources/2014-01-09-how-to-debug-anything-in-rubymine/edit_configurations_dialog.png %}

<div class="caption">
Figure 2: The "Edit Configurations" dialog box. Notice how it does not provide an option for you
to run the debugger against an executable not on the list.
</div>

But what if you want to use the debugger on a program not listed in the Edit Configurations box? For example, we might
be writing a plugin for the Jekyll blogging engine, or we might want to learn more about the metaprogramming behind
Nanoc. Alternative frameworks to Rails often have their own set of terminal commands for invoking the program. You might
have to run it by calling ```jekyll build``` or ```nanoc compile```.

A simple hack for getting such programs to run in RubyMine's debugger is to create a rake task which invokes the program
for you. In this example, I want to set a breakpoint in Nanoc's Rules file. Since this isn't a default in Rubymine's
configuration, I can get around this limitation by calling Nanoc through a task in my Rakefile.

{% codeblock Rakefile lang:ruby %}
desc "compile with nanoc"
task :compile do
  system 'nanoc compile'
end
{% endcodeblock %}

Now I can debug nanoc's compiler by creating a debug configuration in RubyMine and setting it to call the rake
task I've created.

{% img /resources/2014-01-09-how-to-debug-anything-in-rubymine/rake_configuration.png %}

<div class="caption">
Figure 3: The configuration in RubyMine to call my Rake task.
</div>

{% img /resources/2014-01-09-how-to-debug-anything-in-rubymine/debugging_nanoc.png %}

<div class="caption">
Figure 4: The debugger stoped at a breakpoint after calling the Nanoc compiler.
</div>

Sometimes Ruby can be a confusing language because of all its metaprogramming. At times it is difficult to tell what
class an object might descend from, or which version of an overloaded method is getting called. RubyMine is an excellent
tool for helping you decipher the code behind Ruby gems and better understand how they are designed.