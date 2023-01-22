export default interface DownloadsData {
    downloads: Array<{
        time: number,
        file: string,
    }>,
    total: number
}