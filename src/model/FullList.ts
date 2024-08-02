
import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void,                     
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []) { }    //we are creating this as private because we are creating one list only

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)                //we are providing as instance because we have fullList as static 
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))         //this json is used to cnovert this array (or javascript object) into a json string and local storage store only string 
    }

    clearList(): void {
        this._list = [] 
        this.save()                           //we are saving because we don't want to reload the cleared item
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}
  