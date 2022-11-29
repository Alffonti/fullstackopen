# Unicafe

The web application aims to implement a web application for collecting customer feedback.

Some statistics are displayed in an HTML table once feedback has been gathered:
- the total number of collected feedback,
- the average score (good: 1, neutral: 0, bad: -1) and
- the percentage of positive feedback.

The `<tbody>` element was added in the Statistics component to avoid the following warning:

```
Warning: validateDOMNesting(...): <tr> cannot appear as a child of <table>...
```

## Resources
- [HTML table basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)