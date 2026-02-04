export function formatDate(date: Date) {
    const formattedDate = date.toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return formattedDate;
}

export function formatTime(date: Date) {
    const time = date.toLocaleDateString("da-DK", {
        hour: "numeric",
        minute: "numeric",
    });

    // return only the hours and minutes
    const formattedTime = time.split(", ")[1];
    return formattedTime;
}

export function formatDateAndTime(date: Date) {
    const formattedDateAndTime = date.toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    return formattedDateAndTime;
}



export function formatPrice(price:number) {
    const formattedPrice = new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
    }).format(price);
    return formattedPrice;
}