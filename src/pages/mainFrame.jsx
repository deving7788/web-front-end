import { TheNested } from "../router.jsx"
import { TopBanner, Footer } from "../components"

function MainFrame() {
    return (
			<div id="main-frame">
				<TopBanner/>
				<TheNested/>
				<Footer/>
			</div>
		)
}


export default MainFrame
