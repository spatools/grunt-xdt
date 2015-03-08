# grunt-xdt [![NPM version](https://badge.fury.io/js/grunt-xdt.png)](http://badge.fury.io/js/grunt-xdt)

[Grunt][grunt] [XDT][xdt] - XDT Transformation task for Grunt


## Getting Started

Install this grunt plugin next to your project's gruntfile with: `npm install grunt-xdt --save-dev`

Then add this line to your project's `Gruntfile.js` :

```javascript
grunt.loadNpmTasks('grunt-xdt');
```

Then specify your config:

```javascript
grunt.initConfig({
    xdt: {
        debug: {
            src: 'test/Web.config',
            dest: 'test/Web.Result.config',
            options: {
                transform: 'test/Web.Release.config',
            }
        }
    }
});
```

Using the configuration above, consider the following example xml to see it in action:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <add name="DefaultConnection" connectionString="DefaultValue" />
  </connectionStrings>
</configuration>
```

Using the transformation configuration below:

```xml
<?xml version="1.0"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <connectionStrings>
    <add name="DefaultConnection" 
      connectionString="Transformed" 
      xdt:Transform="SetAttributes" xdt:Locator="Match(name)" />
    
    <add name="AWLT" connectionString="newstring"
       providerName="newprovider"
       xdt:Transform="Insert" />
  </connectionStrings>
</configuration>
```

After running the grunt task it will be stored on the dist folder as

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <add name="DefaultConnection" connectionString="Transformed" />
  <add name="AWLT" connectionString="newstring" providerName="newprovider" /></connectionStrings>
</configuration>
```

[grunt]: https://github.com/gruntjs/grunt
[xdt]: http://msdn.microsoft.com/en-us/library/dd465326(v=vs.110).aspx

## Release History
* 0.1.0 Initial Release
* 0.1.1 
    * Fix issue causing ENOENT when executing task multiple times
    * Use async to better handle async spawn calls
