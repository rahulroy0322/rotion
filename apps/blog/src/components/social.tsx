import { cn } from "ui/lib/utils"
import type { Icon } from "@phosphor-icons/react"
import type { FC } from "react"

type SocialIconIconPropsType = {
    Icon: Icon
    href: string
    disabled?: boolean
}

const SocialIconIcon: FC<SocialIconIconPropsType> = ({
    Icon,
    disabled = false,
    ...props
}) => <a {...props} className={cn("p-1 bg-inherit shadow size-10 block", { "pointer-events-none cursor-not-allowed opacity-50": disabled })} >
        <Icon />
    </a>


export {
    SocialIconIcon
}