import UserModel from './UserModel'

export default class PostModel {
    id?: string
    created: string = ''
    title: string = ''
    image: string = ''
    idUser: string = ''
    user: any
    like: Array<string> = []
    comment: Array<string> = []
    constructor(dict: any) {
        if (dict === undefined || dict === null) {
            return
        }
        this.id = dict?.id ?? ''
        this.title = dict?.data?.title ?? ''
        this.image = dict?.data?.image ?? ''
        this.created = dict?.data?.created ?? ''
        this.idUser = dict?.idUser ?? ''
        this.user = dict?.user ?? ''
        this.like = dict?.like ?? []
        this.comment = dict?.comment ?? []
    }
}
