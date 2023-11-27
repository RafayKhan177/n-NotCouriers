import TrackBookingIcon from "@mui/icons-material/TrackChanges";
import JobInquiryIcon from "@mui/icons-material/Help";
import PriceJobIcon from "@mui/icons-material/MonetizationOn";
import AddressesIcon from "@mui/icons-material/LocationOn";
import InvoicesIcon from "@mui/icons-material/Receipt";

const clientServiceslinks = [
  {
    title: "Price The Job",
    description: "Place a Booking",
    link: "/PriceTheJob",
    icon: <PriceJobIcon />,
  },
  {
    title: "Track Booking",
    description: "Track your recent bookings",
    link: "/TrackBooking",
    icon: <TrackBookingIcon />,
  },
  {
    title: "Job Inquiry",
    description: "Enquire on a specific booking",
    link: "/JobInquiry",
    icon: <JobInquiryIcon />,
  },

  {
    title: "Addresses",
    description: "Manage frequent addresses",
    link: "/FrequentAddresses",
    icon: <AddressesIcon />,
  },
  {
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
  { link: "/admin/ManageJobs", label: "Manage Jobs" },
  { link: "/admin/ManageBookings", label: "Manage Bookings" },
  { link: "/admin/MenageUsers", label: "Manage Users" },
  { link: "/admin/Services", label: "Manage Services" },
];

const userPages = [
  { link: "/ClientServices", label: "Client Services" },
  { link: "/FrequentAddresses", label: "Frequent Addresses" },
  { link: "/PlaceTheBooking", label: "Place A Booking" },
  { link: "/RecentInvoices", label: "Recent Invoices" },
];

const businessPages = [
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
  businessPages,
};
