import { Drivers, Promotion } from "@/types";

// Mock data for Overview
export const overviewDriversData: Drivers[] = [
  { 
    id: 1, 
    name: "Richard Kyuli", 
    amount: "200", 
    paymentMethod: "Bank", 
    date: "Dec 30, 2019", 
    amountOwed: "600", 
    imageSrc: "/driverpic.svg" 
  },
  { 
    id: 2, 
    name: "Simon Ndung'u", 
    amount: "350", 
    paymentMethod: "Mpesa", 
    date: "Dec 31, 2019", 
    amountOwed: "800", 
    imageSrc: "/simon.png" 
  },
  { id: 3, name: "Peter Njenga", amount: "450", paymentMethod: "Bank", date: "Jan 1, 2020", amountOwed: "750", imageSrc: "/muhia.jpg" },
  { id: 4, name: "Muhu Njenga", amount: "500", paymentMethod: "Bank", date: "Jan 3, 2020", amountOwed: "900", imageSrc: "/Muhu.png" },
  { id: 5, name: "Sweeny Mbuvi", amount: "700", paymentMethod: "Mpesa", date: "Jan 5, 2020", amountOwed: "600", imageSrc: "/WhatsApp Image 2024-11-29 at 1.05.45 PM (2).jpeg" },
  { id: 6, name: "Mark Mutiso", amount: "300", paymentMethod: "Mpesa", date: "Jan 7, 2020", amountOwed: "650", imageSrc: "/_.png" },
  { id: 7, name: "Keren-Happuch Wanjiru", amount: "550", paymentMethod: "Bank", date: "Jan 10, 2020", amountOwed: "850", imageSrc: "/_.png" },
  { id: 8, name: "Bat-tziyon Mbiki", amount: "600", paymentMethod: "Mpesa", date: "Jan 12, 2020", amountOwed: "700", imageSrc: "/Fond d'écran Gamer 4k.png" },
  { id: 9, name: "Mohamed Salah", amount: "1000", paymentMethod: "Bank", date: "Jan 15, 2020", amountOwed: "1200", imageSrc: "/mo salah.jpeg" },
  { id: 10, name: "Virgil van Dijk", amount: "900", paymentMethod: "Bank", date: "Jan 18, 2020", amountOwed: "950", imageSrc: "/virgil van dijk.jpeg" },
  { id: 11, name: "Trent Alexander-Arnold", amount: "750", paymentMethod: "Mpesa", date: "Jan 20, 2020", amountOwed: "800", imageSrc: "/trent alexander arnold.jpeg" },
  { id: 12, name: "Alisson Becker", amount: "850", paymentMethod: "Mpesa", date: "Jan 22, 2020", amountOwed: "1000", imageSrc: "/alisson becker.jpeg" },
  { id: 13, name: "Luis Díaz", amount: "780", paymentMethod: "Bank", date: "Jan 25, 2020", amountOwed: "820", imageSrc: "/luiz diaz.jpeg" },
  { id: 14, name: "Darwin Nunez", amount: "720", paymentMethod: "Mpesa", date: "Jan 27, 2020", amountOwed: "750", imageSrc: "/darwin nunez.jpg" },
  { id: 15, name: "Andrew Robertson", amount: "680", paymentMethod: "Bank", date: "Jan 29, 2020", amountOwed: "700", imageSrc: "/driverpic.svg" },
];

// Mock data for Payouts
export const payoutsDriversData: Drivers[] = [
  { 
    id: 1, 
    name: "Richard Kyuli", 
    amount: "200", 
    paymentMethod: "Bank", 
    date: "Dec 30, 2019", 
    imageSrc: "/driverpic.svg" 
  },
  { 
    id: 2, 
    name: "Simon Ndung'u", 
    amount: "350", 
    paymentMethod: "Mpesa", 
    date: "Dec 31, 2019", 
    imageSrc: "/simon.png" 
  },
  { id: 3, name: "Peter Njenga", amount: "450", paymentMethod: "Bank", date: "Jan 1, 2020", imageSrc: "/muhia.jpg" },
  { id: 4, name: "Muhu Njenga", amount: "500", paymentMethod: "Bank", date: "Jan 3, 2020", imageSrc: "/Muhu.png" },
  { id: 5, name: "Sweeny Mbuvi", amount: "700", paymentMethod: "Mpesa", date: "Jan 5, 2020", imageSrc: "/WhatsApp Image 2024-11-29 at 1.05.45 PM (2).jpeg" },
  { id: 6, name: "Mark Mutiso", amount: "300", paymentMethod: "Mpesa", date: "Jan 7, 2020", imageSrc: "/_.png" },
  { id: 7, name: "Keren-Happuch Wanjiru", amount: "550", paymentMethod: "Bank", date: "Jan 10, 2020", imageSrc: "/_.png" },
  { id: 8, name: "Bat-tziyon Mbiki", amount: "600", paymentMethod: "Mpesa", date: "Jan 12, 2020", imageSrc: "/Fond d'écran Gamer 4k.png" },
  { id: 9, name: "Mohamed Salah", amount: "1000", paymentMethod: "Bank", date: "Jan 15, 2020", imageSrc: "/mo salah.jpeg" },
  { id: 10, name: "Virgil van Dijk", amount: "900", paymentMethod: "Bank", date: "Jan 18, 2020", imageSrc: "/virgil van dijk.jpeg" },
  { id: 11, name: "Trent Alexander-Arnold", amount: "750", paymentMethod: "Mpesa", date: "Jan 20, 2020", imageSrc: "/trent alexander arnold.jpeg" },
  { id: 12, name: "Alisson Becker", amount: "850", paymentMethod: "Mpesa", date: "Jan 22, 2020", imageSrc: "/alisson becker.jpeg" },
  { id: 13, name: "Luis Díaz", amount: "780", paymentMethod: "Bank", date: "Jan 25, 2020", imageSrc: "/luiz diaz.jpeg" },
  { id: 14, name: "Darwin Nunez", amount: "720", paymentMethod: "Mpesa", date: "Jan 27, 2020", imageSrc: "/darwin nunez.jpg" },
  { id: 15, name: "Andrew Robertson", amount: "680", paymentMethod: "Bank", date: "Jan 29, 2020", imageSrc: "/driverpic.svg" },
  { id: 16, name: "CurtiS Jones", amount: "820", paymentMethod: "Mpesa", date: "Jan 31, 2020", imageSrc: "/driverpic.svg" },
  { id: 17, name: "Mac Allister", amount: "600", paymentMethod: "Bank", date: "Feb 2, 2020", imageSrc: "/driverpic.svg" },
  { id: 18, name: "Diogo Jota", amount: "880", paymentMethod: "Mpesa", date: "Feb 5, 2020", imageSrc: "/driverpic.svg" },
  { id: 19, name: "Joe Gomez", amount: "750", paymentMethod: "Mpesa", date: "Feb 8, 2020", imageSrc: "/driverpic.svg" },
  { id: 20, name: "Endo Wataru", amount: "820", paymentMethod: "Bank", date: "Feb 10, 2020", imageSrc: "/driverpic.svg" },
];


// Mock data for Expected Commission
export const expectedCommissionData: Drivers[] = [
  { id: 1, name: "Richard Kyuli", unsubmittedAmount: "200,000", limit: "500,000", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 2, name: "Simon Ndung'u", unsubmittedAmount: "350,000", limit: "800,000", activityStatus: "Inactive", imageSrc: "/simon.png" },
  { id: 3, name: "Peter Njenga", unsubmittedAmount: "450,000", limit: "1,000,000", activityStatus: "Active", imageSrc: "/muhia.jpg" },
  { id: 4, name: "Muhu Njenga", unsubmittedAmount: "500,000", limit: "1,200,000", activityStatus: "Inactive", imageSrc: "/Muhu.png" },
  { id: 5, name: "Sweeny Mbuvi", unsubmittedAmount: "700,000", limit: "1,500,000", activityStatus: "Active", imageSrc: "/WhatsApp Image 2024-11-29 at 1.05.45 PM (2).jpeg" },
  { id: 6, name: "Mark Mutiso", unsubmittedAmount: "300,000", limit: "900,000", activityStatus: "Inactive", imageSrc: "/_.png" },
  { id: 7, name: "Keren-Happuch Wanjiru", unsubmittedAmount: "550,000", limit: "1,100,000", activityStatus: "Active", imageSrc: "/_.png" },
  { id: 8, name: "Bat-tziyon Mbiki", unsubmittedAmount: "600,000", limit: "1,000,000", activityStatus: "Inactive", imageSrc: "/Fond d'écran Gamer 4k.png" },
  { id: 9, name: "Mohamed Salah", unsubmittedAmount: "1,000,000", limit: "2,000,000", activityStatus: "Active", imageSrc: "/mo salah.jpeg" },
  { id: 10, name: "Virgil van Dijk", unsubmittedAmount: "900,000", limit: "1,800,000", activityStatus: "Active", imageSrc: "/virgil van dijk.jpeg" },
  { id: 11, name: "Trent Alexander-Arnold", unsubmittedAmount: "750,000", limit: "1,600,000", activityStatus: "Inactive", imageSrc: "/trent alexander arnold.jpeg" },
  { id: 12, name: "Alisson Becker", unsubmittedAmount: "850,000", limit: "1,700,000", activityStatus: "Active", imageSrc: "/alisson becker.jpeg" },
  { id: 13, name: "Luis Díaz", unsubmittedAmount: "780,000", limit: "1,550,000", activityStatus: "Inactive", imageSrc: "/luiz diaz.jpeg" },
  { id: 14, name: "Darwin Nunez", unsubmittedAmount: "720,000", limit: "1,400,000", activityStatus: "Active", imageSrc: "/darwin nunez.jpg" },
  { id: 15, name: "Andrew Robertson", unsubmittedAmount: "680,000", limit: "1,350,000", activityStatus: "Inactive", imageSrc: "/driverpic.svg" },
  { id: 16, name: "Curtis Jones", unsubmittedAmount: "820,000", limit: "1,600,000", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 17, name: "Mac Allister", unsubmittedAmount: "600,000", limit: "1,200,000", activityStatus: "Inactive", imageSrc: "/driverpic.svg" },
  { id: 18, name: "Diogo Jota", unsubmittedAmount: "880,000", limit: "1,750,000", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 19, name: "Joe Gomez", unsubmittedAmount: "750,000", limit: "1,500,000", activityStatus: "Inactive", imageSrc: "/driverpic.svg" },
  { id: 20, name: "Endo Wataru", unsubmittedAmount: "820,000", limit: "1,650,000", activityStatus: "Active", imageSrc: "/driverpic.svg" }
];


// Mock data for Pending Payouts
export const pendingPayoutsData: Drivers[] = [
  { id: 1, name: "Richard Kyuli", pendingAmount: "200", lastPaymentDate: "Dec 30, 2019", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 2, name: "Simon Ndung'u", pendingAmount: "350", lastPaymentDate: "Dec 31, 2019", activityStatus: "Offline", imageSrc: "/simon.png" },
  { id: 3, name: "Peter Njenga", pendingAmount: "450", lastPaymentDate: "Jan 1, 2020", activityStatus: "Active", imageSrc: "/muhia.jpg" },
  { id: 4, name: "Muhu Njenga", pendingAmount: "500", lastPaymentDate: "Jan 3, 2020", activityStatus: "Offline", imageSrc: "/Muhu.png" },
  { id: 5, name: "Sweeny Mbuvi", pendingAmount: "700", lastPaymentDate: "Jan 5, 2020", activityStatus: "Active", imageSrc: "/WhatsApp Image 2024-11-29 at 1.05.45 PM (2).jpeg" },
  { id: 6, name: "Mark Mutiso", pendingAmount: "300", lastPaymentDate: "Jan 7, 2020", activityStatus: "Offline", imageSrc: "/_.png" },
  { id: 7, name: "Keren-Happuch Wanjiru", pendingAmount: "550", lastPaymentDate: "Jan 10, 2020", activityStatus: "Active", imageSrc: "/_.png" },
  { id: 8, name: "Bat-tziyon Mbiki", pendingAmount: "600", lastPaymentDate: "Jan 12, 2020", activityStatus: "Offline", imageSrc: "/Fond d'écran Gamer 4k.png" },
  { id: 9, name: "Mohamed Salah", pendingAmount: "1000", lastPaymentDate: "Jan 15, 2020", activityStatus: "Active", imageSrc: "/mo salah.jpeg" },
  { id: 10, name: "Virgil van Dijk", pendingAmount: "900", lastPaymentDate: "Jan 18, 2020", activityStatus: "Offline", imageSrc: "/virgil van dijk.jpeg" },
  { id: 11, name: "Trent Alexander-Arnold", pendingAmount: "750", lastPaymentDate: "Jan 20, 2020", activityStatus: "Active", imageSrc: "/trent alexander arnold.jpeg" },
  { id: 12, name: "Alisson Becker", pendingAmount: "850", lastPaymentDate: "Jan 22, 2020", activityStatus: "Offline", imageSrc: "/alisson becker.jpeg" },
  { id: 13, name: "Luis Díaz", pendingAmount: "780", lastPaymentDate: "Jan 25, 2020", activityStatus: "Active", imageSrc: "/luiz diaz.jpeg" },
  { id: 14, name: "Darwin Nunez", pendingAmount: "720", lastPaymentDate: "Jan 27, 2020", activityStatus: "Offline", imageSrc: "/darwin nunez.jpg" },
  { id: 15, name: "Andrew Robertson", pendingAmount: "680", lastPaymentDate: "Jan 29, 2020", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 16, name: "Curtis Jones", pendingAmount: "820", lastPaymentDate: "Jan 31, 2020", activityStatus: "Offline", imageSrc: "/driverpic.svg" },
  { id: 17, name: "Mac Allister", pendingAmount: "600", lastPaymentDate: "Feb 2, 2020", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 18, name: "Diogo Jota", pendingAmount: "880", lastPaymentDate: "Feb 5, 2020", activityStatus: "Offline", imageSrc: "/driverpic.svg" },
  { id: 19, name: "Joe Gomez", pendingAmount: "750", lastPaymentDate: "Feb 8, 2020", activityStatus: "Active", imageSrc: "/driverpic.svg" },
  { id: 20, name: "Endo Wataru", pendingAmount: "820", lastPaymentDate: "Feb 10, 2020", activityStatus: "Offline", imageSrc: "/driverpic.svg" }
];

export const promotionsData: Promotion[] = [
  {
    id: 1,
    name: "Christmas Offer",
    creationDate: "Dec 30, 2019 05:18",
    discount: "12%",
    beneficiaries: 334,
    completedRides: 456,
    status: "Active",
    validity: "30 days"
  },
  {
    id: 2,
    name: "Easter Holiday offer",
    creationDate: "Dec 28, 2019 03:15",
    discount: "15%",
    beneficiaries: 213,
    completedRides: 846,
    status: "Inactive",
    validity: "45 days"
  },
  {
    id: 3,
    name: "Black Friday",
    creationDate: "Dec 25, 2019 14:22",
    discount: "20%",
    beneficiaries: 846,
    completedRides: 545,
    status: "Active",
    validity: "15 days"
  }
];
