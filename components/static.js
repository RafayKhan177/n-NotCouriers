import Link from "next/link";
import PlaceBookingIcon from "@mui/icons-material/Place";
import TrackBookingIcon from "@mui/icons-material/TrackChanges";
import JobInquiryIcon from "@mui/icons-material/Help";
import PriceJobIcon from "@mui/icons-material/MonetizationOn";
import AddressesIcon from "@mui/icons-material/LocationOn";
import InvoicesIcon from "@mui/icons-material/Receipt";

const clientServiceslinks = [
  {
    image: "Place Booking",
    title: "Place Booking",
    description: "Place a Booking",
    link: "/PlaceTheBooking",
    icon: <PlaceBookingIcon />,
  },
  {
    image: "Track Booking",
    title: "Track Booking",
    description: "Track your recent bookings",
    link: "/TrackBooking",
    icon: <TrackBookingIcon />,
  },
  {
    image: "Job Inquiry",
    title: "Job Inquiry",
    description: "Enquire on a specific booking",
    link: "/JobInquiry",
    icon: <JobInquiryIcon />,
  },
  {
    image: "Price Job",
    title: "Price Job",
    description: "Price a booking",
    link: "/PriceTheJob",
    icon: <PriceJobIcon />,
  },
  {
    image: "Addresses",
    title: "Addresses",
    description: "Manage frequent addresses",
    link: "/FrequentAddresses",
    icon: <AddressesIcon />,
  },
  {
    image: "Invoices",
    title: "Invoices",
    description: "View invoices",
    link: "/RecentInvoices",
    icon: <InvoicesIcon />,
  },
];

const serviceOptions = [
  { value: "Standard" },
  { value: "Express" },
  { value: "Direct" },
];

const suburbOption = [
  { value: "Suburb 1" },
  { value: "Suburb 2" },
  { value: "Suburb 3" },
];

const adminPages = [
  { link: "/ClientServices", label: "Client Services" },
  { link: "/admin/MenageInvoices", label: "Menage Invoices" },
  { link: "/admin/MenageUsers", label: "Menage Users" },
  { link: "/admin/Services", label: "Menage Services" },
];

const userPages = [
  { link: "/ClientServices", label: "Client Services" },
  { link: "/FrequentAddresses", label: "Frequent Addresses" },
  { link: "/PlaceTheBooking", label: "Place A Booking" },
  { link: "/PriceTheJob", label: "Price A Job" },
  { link: "/RecentInvoices", label: "Recent Invoices" },
];

const authPages = [
  { link: "/Signin", label: "Sign In" },
  { link: "/Signup", label: "Sign Up" },
];

const statuses = [
  { val: "booked", status: "Booked" },
  { val: "etd", status: "E.T.D." },
  { val: "allocated", status: "Allocated" },
  { val: "pickedup", status: "Pick Up" },
  { val: "delivered", status: "Delivered" },
  { val: "pod", status: "P.O.D." },
];

export {
  adminPages,
  userPages,
  authPages,
  serviceOptions,
  clientServiceslinks,
  suburbOption,
  statuses,
};
