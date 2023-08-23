const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // use try and catch with async along with await
    try {
      const retrieveQuotes = await fs.readFile(QUOTE_FILE, 'utf-8');  // reading the quote file, no need to writeFile since there are no changes to quote file in this function
      const newQuote = retrieveQuotes.trim().split("\n") // trim and split the quotes

      if (newQuote.length === 0) {  // if quote file is empty, then it will say there is no quote
        console.log("There is no quote")
        return
      }

    // TODO: Pull a random quote from the quotes.txt file
    const randomized = Math.floor(Math.random() * newQuote.length)  // randomizing formula for quotes
    const randomQuotes = newQuote[randomized]

    // console log the quote and author
    // You may style the text with chalk as you wish
    const [quote, author] = randomQuotes.split("|") // spliting the quote and author in quote file with pipe
    const chalkQuote = chalk.bold(quote)
    const chalkAuthor = chalk.italic(author)

    console.log(`${chalkQuote} | ${chalkAuthor}`) // showing quote and author in chalk modification
    }
    catch (error) {console.error ("error with getQuote, ", error.message)}  // catching error is something in this function is wrong
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving

    // using try and catch with await here again
    // using writeFile will overwrite the existing file so instead of using readFile and writeFile, we can use appendFile 
    try {
      const displayQuote = `${quote} | ${author || "Anonymous" || "undefined"} + "\n"`  // the quote and author will show in the same format as quote file, if there is no author or undefined, it will show Anonymous
      await fs.appendFile(QUOTE_FILE,displayQuote) // append quote file with the newly added quote
      console.log("Quote added successfully") // alert user that quote is added
    } catch (error) {
      console.error ("error with addQuote, ", error.message)
    }

  });

program.parse();
