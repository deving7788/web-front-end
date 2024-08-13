import { TheNested } from "../router.jsx"
import { TopBanner, Footer } from "../components"

function MainFrame() {

  console.log("test in main frame")

    return (
			<div id="main-frame">
				<TopBanner/>
				<TheNested/>
				<Footer/>
			</div>
		)
}


export default MainFrame
