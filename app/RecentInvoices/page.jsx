import { TableSort } from '../../components/Index'
import { userRole } from "../../api/firebase/functions/auth"

export default function page() {
  if (userRole() == null) return <div>Please log in</div>;
  return (
    <TableSort singleBtn={true} />
  )
}
