import { Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import Image from 'next/image'

type ProfileAvatarProps = {
    profileIMG: string | null;
}

export default function ProfileAvatar({
    profileIMG
}:ProfileAvatarProps){
    return (
        <Avatar className='w-14 h-14'>
            <AvatarImage src={profileIMG ?? undefined} />
            <AvatarFallback>
                <Image
                    src="/profile.png"
                    width={100}
                    height={100}
                    alt='profile-img'
                />
            </AvatarFallback>
        </Avatar>
    )
}