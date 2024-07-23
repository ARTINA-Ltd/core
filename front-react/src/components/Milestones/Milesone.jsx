import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { FaBug, FaRegCalendarCheck,FaQuestionCircle , FaRegFileAlt } from 'react-icons/fa'
import { RiGuideFill } from "react-icons/ri";
import { FcAdvertising } from "react-icons/fc";
import { GiDeadWood } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAttachMoney,MdSell  } from "react-icons/md";




const FlowComponent = () => {


  return (
    <div className=" w-full mx-auto my-12 flex justify-center items-center " style={{ height: "80vh" }}>
    <Timeline minEvents={5} placeholder>
    <TimelineEvent
      icon={MdOutlineAttachMoney}
      title="Gain Money"
      color="#38BDF8"
      // subtitle='26/03/2019 09:51'
    />
    <TimelineEvent
      icon={MdSell}
      color="#4E45D0"
      title='Sell NFT'
      // subtitle='26/03/2019 09:51'
    />
    <TimelineEvent
      icon={FcAdvertising}
      title='Advertise Your NFT'
      color="#F46FAC"
      // subtitle='26/03/2019 09:51'
    />
    <TimelineEvent
      icon={GrMoney}
      title='Make Income'
      color="#4E45D0"
      // subtitle='Make Income'
    />
    <TimelineEvent
      icon={FaRegCalendarCheck}
      title="Artina's NFT Mint"
      color="#FF6384  "
      // subtitle='26/03/2019 09:51'
    />
    <TimelineEvent
      color='#87a2c7'
      icon={RiGuideFill}
      title='Create NFT'
      // subtitle='26/03/2019 09:51'
    />
    <TimelineEvent
      color='#9c2919'
      icon={FaQuestionCircle}
      title="Whats's NFT?"
      // subtitle='26/03/2019 09:51'
      action={{
        label: 'کلیک نکن',
        onClick: () => window.alert('گفتم کلیک نکن چرا کلیک کردی')
      }}
    />
  </Timeline>
    </div>
  );
};

export default FlowComponent;
