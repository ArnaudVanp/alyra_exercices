var program = require("commander")
program
.version("1.0.0")
.parse(process.argv)

function palindrome(mot) {
    if (( mot.length == 0 ) || (mot.length == 1)) 
    return true
    else if (mot[0] == mot[mot.length-1])
    return palindrome(mot.substring(1,mot.length-1))
    else 
    return false
    }
    
    function estPalindrome(chaine) {
    console.log(chaine, palindrome(chaine.split(" ").join(""))?"is":"is not","a palindrome")
    }
    
    estPalindrome(process.argv[2])
