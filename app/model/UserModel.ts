export default class UserModel {
    id?: string
    uid: string = ''
    accessToken: string = ''
    name: string = ''
    email: string = ''
    avatarUrl: string = ''

    constructor(dict: any) {
        if (dict === undefined || dict === null) {
            return
        }
        this.id = dict?.id ?? dict?.uid ?? ''
        this.uid = dict?.uid ?? ''
        this.email = dict?.email ?? ''
        this.accessToken = dict?.accessToken ?? ''
        this.name = dict?.name ?? ''
        this.avatarUrl = dict?.avatarUrl ?? ''
    }
}
