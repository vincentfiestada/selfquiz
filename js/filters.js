var selfquizFilters = angular.module("selfquizFilters", []);

/* Returns a string from an array, in the form a list delimited by argument sep
   You can also specify a property 'prop' which will be used as the string,
   otherwise input itself will be treated as the string to append to the list
*/
selfquizFilters.filter("strFromList", function()
{
    return function(input, sep, prop)
    {
        if (typeof(sep) === "undefined" ) sep = ','; // default value for sep
        var useProperty = (typeof(prop) === "undefined" ) ? false : true;
        var listStr = "";
        angular.forEach(input, function(value, key)
        {
            if (key !== 0)
            {
                listStr += ", ";
            }
            x = (useProperty) ? value[prop] : value;
            listStr += x.toString();
        });
        return listStr;
    };
});

/* Chooses between two strings based a boolean input */
selfquizFilters.filter("strFromBool", function()
{
    return function(input, y, n)
    {
        // Default true and false strings
        if (typeof(y) === "undefined") y = "Yes";
        if (typeof(n) === "undefined") n = "No";
        return (input) ? y : n;
    };
});
