---
title: java jdk8 后台调用打印机来打印pdf文件
date: 2021-07-26 13:35:24
categories: [technology]
tags: [java]
---
网上搜了很多，基本上用到的类都差不多，但把代码拷过来却发现明明就打印一页pdf，打印机却打出了3张而且内容也全是乱码（**打出乱码问题大概知道了原因：是因为打印机不支持pdf文件打印**）。
### 重要：遇到了2个问题：
>* 1 使用下面的代码遇到了一个问题，在使用`HP laserjet M401d`打印机没有立即不打印，打印机上面显示"将介质装入纸盒1，普通纸 信封C4或按OK使用可用介质"，按了打印机上面的`ok`按钮后才打印，这个问题需要给打印机设置`任何材质打印`。
>* 2 后台代码报错以及打印出来二进制的乱码：`sun.print.PrintJobFlavorException: invalid flavor`，我设置的是`DocFlavor flavor = DocFlavor.INPUT_STREAM.PDF;`根据网上查证，是因为打印机不支持pdf格式，而且在程序里面设置`AUTOSENSE`打印出来就是乱码了，可能是因为这个打印机是用来打印小票的。解决方法是把文件转成`JPEG`格式再打印出来。
<!--more-->
程序代码是自己从 **[tabnine网站](https://www.tabnine.com/code/java/classes/javax.print.SimpleDoc)** 里面搜索相关代码以及查看网上打印的相关api后试验得到可以使用的如下代码
下面代码使用main方法执行，文件使用云盘上或者本地文件，设置为A4纸和横向打印
#### * 主方法
```java
 /**
     * 打印文档具体方法，属性配置
     *
     * @param filePath 文件路径
     * @throws IOException ioexception
     */
    private static void printHelloDocument(String filePath) throws IOException {
        //获取到文件，需要判断是服务器本地文件还是云盘上的文件
        File file = getFile(filePath);
        FileInputStream is = new FileInputStream(file);
        // 构造一个新的空打印请求属性集
        PrintRequestAttributeSet aset = new HashPrintRequestAttributeSet();
        //设置打印文件为pdf
        DocFlavor flavor = DocFlavor.INPUT_STREAM.PDF;
        // 构造具有指定打印数据、doc flavor 和 doc 属性集
        Doc doc = new SimpleDoc(is, flavor, null);
        // 获取所有打印机信息
        PrintService[] services = PrintServiceLookup.lookupPrintServices(flavor, aset);
        // 获取你当前计算机默认打印机
        PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();
        //如果没有获取到默认打印机
        if (defaultService == null) {
            if (services.length == 0) {
                LOGGER.error("没有获取到打印机");
            } else {
                //显示打印设置提示框
                //(这个提示框是jdk8里面的，如果是jdk6的，请换jdk6的提示框)
                SwingUtilities.invokeLater(() -> {
                    PrintService service = ServiceUI.printDialog(null, 200, 200,
                            services, defaultService, flavor, aset);
                    if (service != null) {
                        //如果打印机服务不为空，则建立一个打印作业
                        DocPrintJob job = service.createPrintJob();
                        //调用打印方法
                        printDocument(doc, aset, job);
                    }
                });
            }
        } else {
            //如果有默认打印机，则直接建立一个打印作业
            DocPrintJob job = defaultService.createPrintJob();
            //调用打印方法
            printDocument(doc, aset, job);
        }
    }
```
#### * 获取文件方法
```java
/**
     * 得到文件
     *
     * @param filePath 文件路径
     * @return {@link File}
     */
    private static File getFile(String filePath) {
        File file;
        if (filePath.startsWith("http")) {
            //如果是云盘地址，则转成file文件
            file = fileByInputStream(filePath);
        } else {
            file = new File(filePath);
        }
        return file;
    }
```
#### * 文件从云盘上获取
```java
/**
     * 文件根据输入流生成
     *
     * @param urlStr 文件在云盘上的地址
     * @return {@link File}
     */
    public static File fileByInputStream(String urlStr) {
        //创建文件
        File file = new File("1.pdf");
        try {
            int count = 0;
            byte[] data = new byte[1024];
            //获取云盘上的文件并转成流
            URL url = new URL(urlStr);
            InputStream inputStream = url.openStream();
            OutputStream outputStream = new FileOutputStream(file);
            while ((count = inputStream.read(data, 0, 1024)) != -1) {
                outputStream.write(data, 0, count);
            }
            inputStream.close();
            outputStream.close();
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败", e);
        }
        return file;
    }
```
#### * 使用打印机打印
```java
/**
     * 打印文档
     *
     * @param doc  打印内容
     * @param aset 打印请求属性集
     * @param job  表示了一个可使用作业属性集打印指定文档的打印作业
     */
    private static void printDocument(Doc doc, PrintRequestAttributeSet aset, DocPrintJob job) {
        try {
            //设置纸张为A4纸
            aset.add(MediaSizeName.ISO_A4);
            //设置横向打印（默认是纵向，所以横向要设置）
            aset.add(OrientationRequested.LANDSCAPE);
            //打印
            job.print(doc, aset);
        } catch (PrintException e) {
            e.printStackTrace();
            // may be called from Swing thread
        }
    }
```

#### * 最后调用main方法来测试
```java
    public static void main(String[] args) {
        try {
            //文件地址可以是本地文件也能是云盘上的文件地址
            String filePath = "/Applications/projectForMyself/projectGit/1.pdf";
            //云盘地址
            //String filePath = "http://s3-qos.XXXXX.cn/test/system/XXXXX.pdf";
            printHelloDocument(filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

