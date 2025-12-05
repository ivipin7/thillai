const items = [
    { name: "Onam Saree", price: "Rs.899", quantity: 1 },
    { name: "Space Saree", price: "Rs. 899", quantity: 1 },
    { name: "Comma Saree", price: "Rs.1,500", quantity: 1 },
    { name: "Weird Saree", price: "Rs.899.00", quantity: 1 },
    { name: "Number Saree", price: 899, quantity: 1 }
];

items.forEach(item => {
    let price = 0;
    if (typeof item.price === 'number') {
        price = item.price;
    } else if (typeof item.price === 'string') {
        const numericString = item.price.replace(/[^0-9.]/g, '');
        price = parseFloat(numericString);
        console.log(`Item: ${item.name}, Raw: '${item.price}', Numeric: '${numericString}', Parsed: ${price}`);
    }
    const quantity = item.quantity || 1;
    const total = (isNaN(price) ? 0 : price) * quantity;
    console.log(`Total: ${total}`);
});
