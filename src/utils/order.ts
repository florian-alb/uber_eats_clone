import {Order} from "@/types/order.ts";

export function getRevenue(orders?: Order[]) {
    if (!orders) {
        return 0
    }
    const orderedProducts = orders.map(order => order.orderProducts).flat()
    return orderedProducts.reduce((acc, current) => {
        return acc + parseFloat(String(current.product.price))
    }, 0).toFixed(2)
}

export function getOrderTotal(order?: Order) {
    if (!order) {
        return 0
    }
    const orderedProducts = order.orderProducts
    return parseFloat(orderedProducts.reduce((acc, current) => {
        return acc + parseFloat(String(current.product.price))
    }, 0).toFixed(2))
}

export function getInitials(index: number, orders?: Order[]) {
    if (!orders) {
        return ''
    }

    const firstName = orders[index].customer.firstName
    const lastName = orders[index].customer.lastName

    return `${firstName[0].toUpperCase()} ${lastName[0].toUpperCase()}`
}

export function getFullName(order?: Order) {
    if (!order) {
        return ''
    }

    const fullName = `${order.customer.firstName} ${order.customer.lastName}`

    return fullName.replace(/(^\w)|(\s+\w)/g, letter => letter.toUpperCase());
}

export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('fr-fr', {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}

export function getTodayOrders(orders?: Order[]) {
    if (!orders) {
        return []
    }

    const todayOrders: Order[] = []

    orders.forEach(order => {
        const orderDay = new Date(order.createdAt).toLocaleDateString('fr-fr', {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        const today = new Date().toLocaleDateString('fr-fr', {year: "numeric", month: "short", day: "numeric"})
        if (orderDay === today) {
            todayOrders.push(order)
        }
    })
    return todayOrders
}

export function getTotalOrderedProducts(orders?: Order[]) {
    if (!orders) {
        return 0
    }
    return orders.map(order => order.orderProducts).flat().length
}

export function getQuantity(order?: Order) {
    if (!order) {
        return null
    }

    const cartObject = new Map<string, number>()

    order.orderProducts.forEach(product => {
        const productQuantity = cartObject.get(product.product.name)
        if (productQuantity){
            cartObject.set(product.product.name, productQuantity + 1)
        } else {
            cartObject.set(product.product.name, 1)
        }
    })
    return cartObject
}

