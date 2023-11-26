<template>
  <div id="example" style="padding: 10px">
    <div style="text-align: left; padding: 10px">
      <el-button @click="uploadFile" type="primary">上传</el-button>
      <input
        hidden
        type="file"
        id="newUpload"
        @change="excelChange"
        ref="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />
      <el-button type="primary" @click="exportExcel" style="margin-left: 10px">下载</el-button>
    </div>

    <hot-table ref="hotTableComponent" :data="data" :settings="hotSettings"></hot-table>
  </div>
</template>

<script lang="ts">
import { HotTable } from '@handsontable/vue';
import 'handsontable/dist/handsontable.full.css';
import { read, utils, writeFile } from 'xlsx';
import { getData } from '../utils/constants';
import { progressBarRenderer } from '../renderers/progressBar';
import { starsRenderer } from '../renderers/stars';

import { alignHeaders, drawCheckboxInRowHeaders, addClassesToRows, changeCheckboxCell } from '../utils/hooks-callbacks';

export default {
  name: 'DataGrid',
  data: function () {
    return {
      hotSettings: {
        height: 'auto',
        dropdownMenu: true,
        hiddenColumns: {
          indicators: true,
        },
        contextMenu: true,
        multiColumnSorting: true,
        filters: true,
        rowHeaders: true,
        // afterOnCellMouseDown: changeCheckboxCell,
        // afterGetColHeader: alignHeaders,
        // afterGetRowHeader: drawCheckboxInRowHeaders,
        // beforeRenderer: addClassesToRows,
        // colWidths: [140, 126, 192, 100, 100, 90, 90, 110, 97],
        colHeaders: true,
        // columns: [
        //   { data: 1, type: 'text' },
        //   { data: 2, type: 'text' },
        //   { data: 3, type: 'text' },
        //   {
        //     data: 4,
        //     type: 'date',
        //     allowInvalid: false,
        //   },
        //   { data: 5, type: 'text' },
        //   {
        //     data: 6,
        //     type: 'checkbox',
        //     className: 'htCenter',
        //   },
        //   {
        //     data: 7,
        //     type: 'numeric',
        //   },
        //   {
        //     data: 8,
        //     renderer: progressBarRenderer,
        //     readOnly: true,
        //     className: 'htMiddle',
        //   },
        //   {
        //     data: 9,
        //     renderer: starsRenderer,
        //     readOnly: true,
        //     className: 'star htCenter',
        //   },
        // ],
        licenseKey: 'non-commercial-and-evaluation',
      },
      data: getData(),
    };
  },
  components: {
    HotTable,
  },
  methods: {
    uploadFile() {
      this.$refs.file.click();
    },
    excelChange(e) {
      // https://www.npmjs.com/package/xlsx
      const file = e.currentTarget.files[0];
      e.target.value = '';
      if (!file) return;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      console.log('file=', file, e);
      fileReader.onload = (e) => {
        const workbook = read(e.target.result, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });
        const ws = workbook.Sheets[workbook.SheetNames[0]];
        const json = utils.sheet_to_json(ws, {
          header: 1,
          dateNF: 'yyyy/mm/dd',
        });
        this.swapHotData(json);
        // this.data.data = json;
        console.log('json=', json);
      };
      console.log('nihao');
    },
    exportExcel() {
      const excelData = this.$refs.hotTableComponent.hotInstance.getData();
      console.log('excelData', excelData);
      const ws_name = '表格1'; // sheet名
      const wb = utils.book_new(); // 创建对象
      const ws = utils.aoa_to_sheet(excelData); //填充数据
      utils.book_append_sheet(wb, ws, ws_name); // 写入sheet
      writeFile(wb, `我的表格.xlsx`); // 下载到本地
    },
    swapHotData(data) {
      // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
      this.$refs.hotTableComponent.hotInstance.loadData(data);
    },
  },
};
</script>

<style lang="scss">
/*
  A stylesheet customizing app (custom renderers)
*/

table.htCore {
  tr.odd td {
    background: #fafbff;
  }

  tr.selected td {
    background: #edf3fd;
  }

  td .progressBar {
    height: 10px;
    background: #37bc6c;
  }

  td.star {
    color: #fcb515;
  }
}

/*
  A stylesheet customizing Handsontable style
*/

.handsontable {
  font-weight: 400;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Helvetica Neue', Arial,
    sans-serif;

  .htRight .changeType {
    margin: 3px 1px 0 13px;
  }

  .collapsibleIndicator {
    text-align: center;
  }
}
</style>
