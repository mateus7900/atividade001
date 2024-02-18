
import HeaderItems from "./HeaderItems"
import "./styles.scss"

export default function Header (){
    return <div className="header">
        {HeaderItems.map(item => (
            <a href={item.path} key={JSON.stringify(item)}>{item.text}</a>
        ))}
    </div>
}