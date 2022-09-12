export default class UserModel {
    id?: String
    uid: String = ''
    accessToken: String = ''
    name: String = ''
    email: String = ''

    constructor(dict: any) {
        if (dict === undefined || dict === null) {
            return
        }
        this.id = dict?.id ?? dict?.uid ?? ''
        this.uid = dict?.uid ?? ''
        this.email = dict?.email ?? ''
        this.accessToken = dict?.accessToken ?? ''
        this.name = dict?.name ?? ''
    }
}
